import fs from "fs";
import path from "path";
import FileUtil from "../utils/FileUtil";
import { ImageModel } from "./ImageModel";
import { ImageType } from "./ImageType";
import { TaskConfig } from "./TaskConfig";
import { TaskInterface } from "./TaskInterface";
import tinify = require("tinify");

export class TinyCompressTask implements TaskInterface {
    /**
     * 当前已经压缩的图片数量
     */
    private _curCompressedImageCount: number = 0;

    /**
     * 总共需要压缩的图片数量
     */
    private _totalCompressedImageCount: number = 0;

    /**
     * 所有图片压缩前的总大小（字节数）
     */
    private _srcSizeInBytes: number = 0;

    /**
     * 所有图片压缩后的总大小（字节数）
     */
    private _finalSizeInBytes: number = 0;

    /**
     * 处理任务
     *
     * @param taskConfig 配置参数
     */
    async handle(taskConfig: TaskConfig): Promise<void> {
        // 收集输出目录图片文件
        let imgs: ImageModel[] = [];
        this._collectImageFilePaths(taskConfig.imgDirPath, imgs);

        // 初始化数据
        this._curCompressedImageCount = 0;
        this._totalCompressedImageCount = imgs.length;
        this._finalSizeInBytes = 0;
        this._srcSizeInBytes = 0;
        imgs.forEach((img) => {
            this._srcSizeInBytes += FileUtil.getFileSize(img.filePath);
        });
        console.log(`找到 ${imgs.length} 张原始图片，总大小 ${FileUtil.toReadableFileSize(this._srcSizeInBytes)}`);
        console.log("");

        // 执行加密（替换原文件）
        tinify.key = taskConfig.tinyKey;
        await Promise.all(
            imgs.map((img) => {
                return this._compressImage(img.filePath);
            })
        );
        let totalCompressRate = (this._srcSizeInBytes - this._finalSizeInBytes) / this._srcSizeInBytes;
        console.log("");
        console.log(
            `压缩所有图片完成，大小变化 ${FileUtil.toReadableFileSize(this._srcSizeInBytes)} -> ${FileUtil.toReadableFileSize(this._finalSizeInBytes)} 压缩了 ${totalCompressRate.toFixed(1)}%`
        );
    }

    /**
     * 压缩单个图片
     *
     * @param filePath 图片路径
     */
    private async _compressImage(filePath: string) {
        let srcSize = FileUtil.getFileSize(filePath);
        await tinify.fromFile(filePath).toFile(filePath);
        let compressedSize = FileUtil.getFileSize(filePath);
        this._finalSizeInBytes += compressedSize;
        this._curCompressedImageCount++;
        let compressRate = (srcSize - compressedSize) / srcSize;
        console.log(
            `(${this._curCompressedImageCount}/${this._totalCompressedImageCount}) 压缩图片 ${filePath} 大小变化 ${FileUtil.toReadableFileSize(srcSize)} -> ${FileUtil.toReadableFileSize(
                compressedSize
            )} 压缩了 ${compressRate.toFixed(1)}%`
        );
    }

    /**
     * 获取指定目录的所有图片文件路径
     *
     * @param dirName 目录名
     * @param imgs 接受图片文件的数组
     */
    private _collectImageFilePaths(dirName: string, imgs: ImageModel[]) {
        if (!fs.existsSync(dirName)) {
            throw new Error(`${dirName} 目录不存在`);
        }
        let files = fs.readdirSync(dirName);
        files.forEach((fileName: fs.PathLike) => {
            let filePath = path.join(dirName, fileName.toString());
            let stat: fs.Stats = fs.statSync(filePath);
            if (stat.isDirectory()) {
                this._collectImageFilePaths(filePath, imgs);
            } else {
                let fileExtName = path.extname(filePath);
                switch (fileExtName) {
                    case ".png":
                        imgs.push({
                            type: ImageType.PNG,
                            filePath: filePath,
                        });
                        break;
                    case ".jpg":
                        imgs.push({
                            type: ImageType.JPG,
                            filePath: filePath,
                        });
                        break;
                    case ".jpeg":
                        imgs.push({
                            type: ImageType.JPEG,
                            filePath: filePath,
                        });
                        break;
                }
            }
        });
    }
}
