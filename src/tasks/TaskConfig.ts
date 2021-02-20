/**
 * 项目传入参数
 *
 * @author caizhitao
 * @created 2021-01-07 18:20:54
 */
export class TaskConfig {
    /**
     * 图片文件目录
     */
    imgDirPath: string = "";

    /**
     * tiny key
     */
    tinyKey: string = "";

    /**
     * 最小的文件大小（Bytes）
     * 只有大于这个大小的图片文件才会进行压缩
     */
    minImageSize: number = -1;

    constructor() {
        // console.log("当前执行文件所在目录路径", __dirname);
        // console.log("当前执行文件绝对路径", __filename);
        console.log("当前执行node命令的目录路径", process.cwd());
        console.log("可执行文件路径", process.argv[0]);
        console.log("将执行的脚本路径", process.argv[1]);
        console.log("传入参数", process.argv.slice(2));

        this._fromCmdString(process.argv[2]);

        console.log("");
        console.log("初始化项目配置");
        console.log(this);
        console.log("");
    }

    /**
     * 从命令行传入参数中解析出最终配置
     *
     * @param inputString 命令行传入参数
     */
    private _fromCmdString(inputString: string) {
        let params: string[] = inputString.split(";");
        params.forEach((param: string) => {
            let paramStruct = param.split("=");
            let paramName = paramStruct[0];
            let paramValue = paramStruct[1];
            switch (paramName) {
                case "imgDirPath":
                    this.imgDirPath = paramValue;
                    break;
                case "tinyKey":
                    this.tinyKey = paramValue;
                    break;
                case "minImageSize":
                    this.minImageSize = parseInt(paramValue);
                    break;
            }
        });
    }
}
