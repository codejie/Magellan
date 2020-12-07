import { App } from "../app";
import { hasTodayDayData, insertTodayDayData, updateYesterdayDayData } from "../db/collection-helper";
import { DayData, RuntimeData } from "../definition/data-define";
import { Stock } from "../definition/struct-define";
import NetEaseFetcher from "../fetcher/netease-fetcher";
import logger from "../logger";
import Task from "./task";

interface TaskConfig {
    disabled?: boolean,
    interval: number
}

export default class DayDataTask extends Task {

    TASK_NAME: string = "day_data";

    fetcher: NetEaseFetcher;
    taskConfig: TaskConfig;
    
    constructor(app: App) {
        super(app);
        this.taskConfig = this.baseConfig[this.TASK_NAME] as TaskConfig;
        this.fetcher = new NetEaseFetcher();

        this.interval = this.taskConfig.interval;
    }

    start(): Promise<void> {
        if (!this.taskConfig.disabled)
            super.setTimer();
        return super.start();
    }

    async onLoop(data: any): Promise<void>
     {
        logger.debug('day timeout');
        if (this.isValid() === true) {
            const stockInfos = this.app.stockInfos;
            const dbConn = this.app.dbConn;
            const now = new Date();

            for (let i = 0; i < stockInfos.length; ++ i) {
                const req = stockInfos[i].info;
                const has = await hasTodayDayData(dbConn, req.id, now);
                if (has) {
                    continue;
                }

                const data = await this.fetchDayData(req);
                await insertTodayDayData(dbConn, data);
                await updateYesterdayDayData(dbConn, data);
            }
        } else {
            logger.debug('[' + this.TASK_NAME + '] skip.');
        }
        super.setTimer();
    }
    
    fetchDayData(req: Stock): Promise<DayData> {
        return new Promise<DayData>((resolve, reject) => {
            this.fetcher.fetchRuntime(req)
                .then(data => {
                    resolve(this.fetcher.makehDayData(req, data));
                })
                .catch(err => {
                    reject(err);
                });
        });
    } 
    
    isValid(): boolean {
        const now = new Date();
        if (now.getDay() == 0 || now.getDay() == 6)
            return false;
        // return true;
        const time: number = now.getHours() * 60 + now.getMinutes();
        const MaxSide = 570 + this.interval / 1000 / 60;
        logger.debug('day_data time = ' + time); 
        logger.debug('day_data maxSide = ' + MaxSide); 
        logger.debug('day_data valid = ' + (time > 570 && time <= MaxSide)); 
        return (time > 570 && time <= MaxSide);//(570 + this.interval / 1000 / 60));
    }
}