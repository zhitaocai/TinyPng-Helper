/**
 * 字节工具类
 *
 * @author caizhitao
 * @created 2021-01-07 19:30:23
 */

export default class ByteUtil {
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
}
