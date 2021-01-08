/**
 * 文件魔数
 * 
 * @author caizhitao
 * @created 2021-01-08 11:28:01
 */
export default class FileChunk {
    /**
     * png 文件魔数，对应文件后缀一般为 .png
     */
    static PNG = [0x89, 0x50, 0x4e, 0x47];

    /**
     * jpeg 文件魔数，对应文件后缀一般为 .jpg .jpeg
     */
    static JPEG = [0xff, 0xd8, 0xff];
}
