import { App } from "../app";
import { findStockData } from "../db/collection-helper";
import { StockData } from "../definition/data-define";
import logger from "../logger";
import systemInfo from "../system-info";
import Task from "./task";

interface TaskConfig {
    disabled?: boolean,
    refreshTime: string
}

export default class SystemInfoTask extends Task {

    TASK_NAME: string = "system_info";

    taskConfig: TaskConfig;

    constructor(app: App) {
        super(app);
        this.taskConfig = this.baseConfig[this.TASK_NAME] as TaskConfig;
        this.interval = 1;// start now!
    }

    calcInterval(): number {
        const data: string[] = this.taskConfig.refreshTime.split(':');
        const setting: number = parseInt(data[0]) * 60 + parseInt(data[1]);

        const time: Date = new Date();
        const now: number = time.getHours() * 60 + time.getMinutes();
        let diff: number = now - setting;

        if (diff < 0) {
            diff += (24 * 60)
        }

        logger.info('refresh system info after %d minutes.', diff);
        return diff * 60 * 1000;
    }

    start(): Promise<void> {
        if (!this.taskConfig.disabled) {
            super.setTimer();
        }
        return super.start();
    }    

    async onLoop(data: any): Promise<void> {
        this.clear();

        await this.updateStockInfos();

        this.interval = this.calcInterval();
        super.setTimer();
    }
    
    clear(): void {
        systemInfo.stocks = [];
    }

    async updateStockInfos(): Promise<void> {
        const data: StockData[] = await findStockData(this.app.dbConn);
        data.forEach(item => {
            systemInfo.stocks.push({
                id: item.id,
                type: item.type,
                market: item.market,
                code: item.code
            });
        });
    }
}