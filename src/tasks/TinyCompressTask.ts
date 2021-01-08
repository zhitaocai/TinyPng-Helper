import FileUtil from "../utils/FileUtil";
import { TaskConfig } from "./TaskConfig";
import tinify = require("tinify");

export class TinyCompressTask {
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
        let imgFilePaths: string[] = [];
        FileUtil.collectFilePaths(taskConfig.imgDirPath, [".png", ".jpg", ".jpeg"], imgFilePaths);

        // 初始化数据
        this._curCompressedImageCount = 0;
        this._totalCompressedImageCount = imgFilePaths.length;
        this._finalSizeInBytes = 0;
        this._srcSizeInBytes = 0;
        imgFilePaths.forEach((imgFilePath) => {
            this._srcSizeInBytes += FileUtil.getFileSize(imgFilePath);
        });
        console.log(`找到 ${imgFilePaths.length} 张原始图片，总大小 ${FileUtil.toReadableFileSize(this._srcSizeInBytes)}`);
        console.log("");

        // 执行加密（替换原文件）
        tinify.key = taskConfig.tinyKey;
        try {
            await Promise.all(
                imgFilePaths.map((imgFilePath) => {
                    return this._compressImage(imgFilePath);
                })
            );
            let totalCompressRate = (this._srcSizeInBytes - this._finalSizeInBytes) / this._srcSizeInBytes;
            console.log("");
            console.log(`压缩完成，大小变化 ${FileUtil.toReadableFileSize(this._srcSizeInBytes)} -> ${FileUtil.toReadableFileSize(this._finalSizeInBytes)} 压缩了 ${totalCompressRate.toFixed(1)}%`);
        } catch (error) {
            console.error("");
            console.error("压缩出错了！");
            console.error("");
            console.error(error);
        }
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
}
