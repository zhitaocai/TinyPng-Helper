import fs from "fs";
import path from "path";
import ByteUtil from "../utils/ByteUtil";
import { ImageModel } from "./ImageModel";
import { ImageType } from "./ImageType";
import { TaskConfig } from "./TaskConfig";
import { TaskInterface } from "./TaskInterface";

export class TinyCompressTask implements TaskInterface {
    /**
     * 处理任务
     *
     * @param taskConfig 配置参数
     */
    handle(taskConfig: TaskConfig): void {
        // 收集输出目录图片文件
        let imgs: ImageModel[] = [];
        this._collectImageFilePaths(taskConfig.imgDirPath, imgs);

        let totalSizeInBytes = 0;
        imgs.forEach((img) => {
            totalSizeInBytes += img.fileSize;
        });
        console.log(`图片处理：找到 ${imgs.length} 张原始图片，总大小 ${ByteUtil.toReadableFileSize(totalSizeInBytes)}`);
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
                            fileSize: stat.size,
                        });
                        break;
                    case ".jpg":
                        imgs.push({
                            type: ImageType.JPG,
                            filePath: filePath,
                            fileSize: stat.size,
                        });
                        break;
                    case ".jpeg":
                        imgs.push({
                            type: ImageType.JPEG,
                            filePath: filePath,
                            fileSize: stat.size,
                        });
                        break;
                }
            }
        });
    }
}
