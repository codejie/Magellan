import Module from "./module";
import { App } from "./app";
import logger from "./logger";
import { EVENT_LOOP } from "./definition/const-define";

interface LoopOptions {
    checkInterval: number
};

export class Scheduler extends Module {

    timer!: ReturnType<typeof setTimeout>;

    dayOpenChecked: number = 0;
    // dayCloseChecked:

    constructor(app: App) {
        super(app);
    }

    start(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.setCheckTimer();
            resolve();
        });        
    }
    
    shutdown(): Promise<void> {
        if (!this.timer)
            clearTimeout(this.timer);
        return super.shutdown();
    }

    timerCallback(data: any): void {
        logger.debug('timeout');
        
        this.app.emit(EVENT_LOOP);
        this.setCheckTimer();
    }

    private setCheckTimer(): void {
        this.timer = setTimeout(this.timerCallback.bind(this), (this.config.Loop as LoopOptions).checkInterval);

    }
}