import { App } from "../app";
import { hasTodayDayData, insertTodayDayData, updateYesterdayDayData } from "../db/collection-helper";
import { DayData, RuntimeData } from "../definition/data-define";
import { Stock } from "../definition/struct-define";
import NetEaseFetcher from "../fetcher/netease-fetcher";
import logger from "../logger";
import Task from "./task";

export default class DayDataTask extends Task {

    fetcher: NetEaseFetcher;
    
    constructor(app: App) {
        super(app);

        this.delay = 59 * 60000;
        this.fetcher = new NetEaseFetcher();
    }

    start(): Promise<void> {
        super.setTimer();
        return super.start();
    }

    async onLoop(data: any): Promise<void>
     {
        logger.debug('day timeout');
        if (this.isValid()) {
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
        return true;
        // const time = now.getHours() * 60 + now.getMinutes();
        // return (time >= 570 && time <= 600);
    }
}