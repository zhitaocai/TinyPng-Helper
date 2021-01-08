import { TinyCompressTask } from "./tasks/TinyCompressTask";
import { TaskConfig } from "./tasks/TaskConfig";

export class TinyHelper {
    async start() {
        let taskConfig = new TaskConfig();
        await new TinyCompressTask().handle(taskConfig);
    }
}

new TinyHelper().start();
