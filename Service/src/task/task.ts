import { App } from "../app";
import Module from "../module";

interface Tasks {
    [name: string]: any
}

export default abstract class Task extends Module {

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
    }

    shutdown(): Promise<void> {
        if (!this.timer)
            clearTimeout(this.timer);        
        return super.shutdown();
    }

}