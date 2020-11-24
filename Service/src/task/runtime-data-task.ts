import { App } from "../app";
import { RuntimeData } from "../definition/data-define";
import { Stock, StockInfo } from "../definition/struct-define";
import NetEaseFetcher from "../fetcher/netease-fetcher";
import logger from "../logger";
import Task from "./task";

export default class RuntimeDataTask extends Task {

    fetcher: NetEaseFetcher;
    
    constructor(app: App) {
        super(app);

        this.delay = 1000;
        this.fetcher = new NetEaseFetcher();
    }

    start(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            super.setTimer();
        });
    }

    async onLoop(data: any): Promise<void>
     {
        logger.debug('timeout');
        const stockInfos = this.app.stockInfos;
        const dbConn = this.app.dbConn;

        for (let i = 0; i < stockInfos.length; ++ i) {
            const req = stockInfos[i].info;
            const data = await this.fetchRuntimeData(req);
            await dbConn.insertRuntimeData(data);
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
}