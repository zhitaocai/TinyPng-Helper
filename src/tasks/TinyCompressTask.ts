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
     * 处理任务
     *
     * @param taskConfig 配置参数
     */
    async handle(taskConfig: TaskConfig): Promise<void> {
        // 收集输出目录图片文件
        let imgs: ImageModel[] = [];
        this._collectImageFilePaths(taskConfig.imgDirPath, imgs);

        // 计算图片大小
        let srcSizeInBytes = 0;
        imgs.forEach((img) => {
            srcSizeInBytes += FileUtil.getFileSize(img.filePath);
        });
        let reableSrcSize = FileUtil.toReadableFileSize(srcSizeInBytes);
        console.log(`图片处理：找到 ${imgs.length} 张原始图片，总大小 ${reableSrcSize}`);

        // 执行加密（替换原文件）
        tinify.key = taskConfig.tinyKey;
        let finalSizeInBytes = 0;
        for (let img of imgs) {
            let srcSize = FileUtil.getFileSize(img.filePath);
            await tinify.fromFile(img.filePath).toFile(img.filePath);
            let compressedSize = FileUtil.getFileSize(img.filePath);
            finalSizeInBytes += compressedSize;
            let compressRate = (srcSize - compressedSize) / srcSize;
            console.log(`压缩图片 ${img.filePath} 大小 ${FileUtil.toReadableFileSize(srcSize)} -> ${FileUtil.toReadableFileSize(compressedSize)} 压缩了 ${compressRate.toFixed(1)}%`);
        }
        let reableFinalSize = FileUtil.toReadableFileSize(finalSizeInBytes);
        let totalCompressRate = (srcSizeInBytes - finalSizeInBytes) / srcSizeInBytes;
        console.log(`压缩所有图片完成，大小 ${reableSrcSize} -> ${reableFinalSize} 压缩了 ${totalCompressRate.toFixed(1)}%`);
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
