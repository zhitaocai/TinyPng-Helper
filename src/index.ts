import { TinyCompressTask } from "./tasks/TinyCompressTask";
import { TaskConfig } from "./tasks/TaskConfig";

export class TinyHelper {
    start() {
        let taskConfig = new TaskConfig();
        new TinyCompressTask().handle(taskConfig);
        console.log("恭喜，处理成功！");
    }
}

new TinyHelper().start();
