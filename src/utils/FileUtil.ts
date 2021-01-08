import fs from "fs";
import path from "path";

/**
 * 字节工具类
 *
 * @author caizhitao
 * @created 2021-01-07 19:30:23
 */
export default class FileUtil {
    /**
     * 将字节数转换为可读字符串
     *
     * @param bytes         字节数
     * @param humanReable   是否为人类可读类型 true：1KB = 1000B false：1KB = 1024B
     */
    static toReadableFileSize(bytes: number, humanReable: boolean = true) {
        let thresh = humanReable ? 1000 : 1024;
        if (Math.abs(bytes) < thresh) {
            return bytes + " B";
        }
        let units = humanReable ? ["KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"] : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
        let u = -1;
        do {
            bytes /= thresh;
            ++u;
        } while (Math.abs(bytes) >= thresh && u < units.length - 1);
        return bytes.toFixed(1) + " " + units[u];
    }

    /**
     * 获取文件大小
     *
     * @param filePath 文件绝对路径
     *
     * @returns 字节数
     */
    static getFileSize(filePath: string): number {
        return fs.statSync(filePath).size;
    }

    /**
     * 获取指定目录及其子目录指定后缀名字的文件的路径
     *
     * @param dirName   目录名
     * @param extNames  期望后缀名字的文件
     * @param result    接受目标后缀文件路径的数组
     */
    static collectFilePaths(dirName: string, extNames: string[], result: string[]) {
        if (!fs.existsSync(dirName)) {
            throw new Error(`${dirName} 目录不存在`);
        }
        let files = fs.readdirSync(dirName);
        files.forEach((fileName: fs.PathLike) => {
            let fileAbsPath: string = path.join(dirName, fileName.toString());
            let stat: fs.Stats = fs.statSync(fileAbsPath);
            if (stat.isDirectory()) {
                this.collectFilePaths(fileAbsPath, extNames, result);
            } else {
                if (extNames.indexOf(path.extname(fileAbsPath)) != -1) {
                    result.push(fileAbsPath);
                }
            }
        });
    }
}
