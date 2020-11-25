import { App } from "../app";
import logger from "../logger";
import Module from "../module";

interface Tasks {
    [name: string]: any
}

export default abstract class Task extends Module {

    TASK_NAME: string = "base_task";

    interval!: number;
    timer!: ReturnType<typeof setTimeout>;
    baseConfig!: Tasks;

    constructor(app: App) {
        super(app);
        this.baseConfig = this.config.Tasks as Tasks;
    }

    start(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            resolve();
        });
    }

    abstract onLoop(data: any): void;

    setTimer(interval?: number, data?: any): void {
        interval = interval || this.interval;
        this.timer = setTimeout(this.onLoop.bind(this), interval, data);

        logger.debug('task [' + this.TASK_NAME + '] set timer : ' + interval);
    }

    shutdown(): Promise<void> {
        if (!this.timer)
            clearTimeout(this.timer);        
        return super.shutdown();
    }

}