import { App } from "../app";
import { insertRuntimeData } from "../db/collection-helper";
import { RuntimeData } from "../definition/data-define";
import { Stock, StockInfo } from "../definition/struct-define";
import NetEaseFetcher from "../fetcher/netease-fetcher";
import logger from "../logger";
import Task from "./task";

interface TaskConfig {
    interval: number
}

const TASK_NAME: any = "runtime_data";

export default class RuntimeDataTask extends Task {

    fetcher: NetEaseFetcher;
    taskConfig: TaskConfig;
    
    constructor(app: App) {
        super(app);
        this.taskConfig = this.baseConfig[TASK_NAME] as TaskConfig;
        this.fetcher = new NetEaseFetcher();

        this.interval = this.taskConfig.interval;
    }

    start(): Promise<void> {
        super.setTimer();
        return super.start();
    }

    async onLoop(data: any): Promise<void>
     {
        logger.debug('timeout');
        if (this.isValid()) {
            const stockInfos = this.app.stockInfos;
            const dbConn = this.app.dbConn;

            for (let i = 0; i < stockInfos.length; ++ i) {
                const req = stockInfos[i].info;
                const data = await this.fetchRuntimeData(req);
                await insertRuntimeData(dbConn, data);
            }
        }
        super.setTimer();
    }
    
    fetchRuntimeData(req: Stock): Promise<RuntimeData> {
        return new Promise<RuntimeData>((resolve, reject) => {
            this.fetcher.fetchRuntime(req)
                .then(data => {
                    resolve(this.fetcher.makeRuntimeData(req, data));
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
        const time = now.getHours() * 60 + now.getMinutes();
        return ((time >= 570 && time <= 690) || (time >= 780 && time <= 900));
    }
}