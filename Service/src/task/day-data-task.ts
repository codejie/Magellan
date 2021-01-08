import { App } from "../app";
import { hasTodayDayData, insertTodayDayData, updateYesterdayDayData } from "../db/collection-helper";
import { DayData, RuntimeData } from "../definition/data-define";
import { Stock } from "../definition/struct-define";
import NetEaseFetcher from "../fetcher/netease-fetcher";
import logger from "../logger";
import systemInfo from "../system-info";
import Task from "./task";

interface TaskConfig {
    disabled?: boolean,
    fetchTime: string
    // interval: number
}

export default class DayDataTask extends Task {

    TASK_NAME: string = "day_data";

    fetcher: NetEaseFetcher;
    taskConfig: TaskConfig;

    checkTime: number;
    checked: boolean = false;
    
    constructor(app: App) {
        super(app);
        this.taskConfig = this.baseConfig[this.TASK_NAME] as TaskConfig;
        this.fetcher = new NetEaseFetcher();

        const setting: string[] = this.taskConfig.fetchTime.split(':');
        this.checkTime = parseInt(setting[0]) * 60 + parseInt(setting[1]);

        this.interval = -1;//this.taskConfig.interval;
    }

    calcInterval(): number {
        const now: Date = new Date();
        const time: number = now.getHours() * 60 + now.getMinutes();

        if (!this.checked) {
            if (this.checkTime < time)
                return 1;
        }

        let diff: number = this.checkTime - time;
        if (diff < 0) {
            diff += (24 * 60);
        }

        return diff * 60 * 1000;
    }

    start(): Promise<void> {
        if (!this.taskConfig.disabled) {
            this.interval = this.calcInterval();
            super.setTimer();
        }
        return super.start();
    }

    async onLoop(data: any): Promise<void>
     {
        logger.debug('day timeout');
        if (this.isValid()) {
            const stockInfos = systemInfo.stocks;
            const dbConn = this.app.dbConn;
            const now = new Date();

            for (let i = 0; i < stockInfos.length; ++ i) {
                const req = stockInfos[i];
                const has = await hasTodayDayData(dbConn, req.id, now);
                if (has) {
                    continue;
                }

                const data = await this.fetchDayData(req);
                await insertTodayDayData(dbConn, data);
                await updateYesterdayDayData(dbConn, data);
            }

            this.checked = true;
        } else {
            logger.debug('[' + this.TASK_NAME + '] skip.');
        }

        this.interval = this.calcInterval();
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