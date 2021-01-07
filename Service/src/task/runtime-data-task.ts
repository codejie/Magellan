import { App } from "../app";
import { insertRuntimeData } from "../db/collection-helper";
import { RuntimeData } from "../definition/data-define";
import { Stock } from "../definition/struct-define";
import NetEaseFetcher from "../fetcher/netease-fetcher";
import logger from "../logger";
import systemInfo from "../system-info";
import Task from "./task";

interface TaskConfig {
    disabled: boolean,
    interval: number,
    validRanges: {
        open: string,
        close: string
    }[]
}

interface ValidRange {
    open: number,
    close: number
}

export default class RuntimeDataTask extends Task {

    TASK_NAME: string = "runtime_data";

    fetcher: NetEaseFetcher;
    taskConfig: TaskConfig;

    validRanges: ValidRange[] = []; 
    
    constructor(app: App) {
        super(app);
        this.taskConfig = this.baseConfig[this.TASK_NAME] as TaskConfig;
        this.fetcher = new NetEaseFetcher();

        this.initValidRanges();

        this.interval = 1000;//this.taskConfig.interval;
    }

    initValidRanges() {
        this.taskConfig.validRanges.forEach(item => {
            const open: string[] = item.open.split(':');
            const close: string[] = item.close.split(':');

            this.validRanges.push({
                open: parseInt(open[0]) * 60 + parseInt(open[1]),
                close: parseInt(close[0]) * 60 + parseInt(close[1])
            });
        });
    }

    calcInterval(): number {
        const now: Date = new Date();
        const time: number = now.getHours() * 60 + now.getMinutes();
        
        let inner = false;
        for (let i = 0; i < this.validRanges.length; ++ i) {
            const item = this.validRanges[i];
            if (time >= item.open && time > item.close) {
                inner = true;
                break;
            }
        };

        if (inner) {
            // calc the diff to next minute
            return (60 - now.getSeconds()) * 1000;
        } else {
            let ret = -1;
            // let found = false;
            for (let i = 0; i < this.validRanges.length; ++ i) {
                const item = this.validRanges[i];
                if (time < item.open) {
                    ret = (item.open - time) * 60 * 1000;
                    break;
                }
            }
            if (ret == -1) {
                ret = ((24 * 60 - time) + this.validRanges[0].open) * 60 * 1000;
            }
            logger.debug('%s will be waked after %d.', this.TASK_NAME, ret);
            return ret;
        }
    }

    start(): Promise<void> {
        this.interval = this.calcInterval();
        super.setTimer();
        return super.start();
    }

    async onLoop(data: any): Promise<void>
    {
        // if (this.isValid()) {

            const stockInfos = systemInfo.stocks;
            const dbConn = this.app.dbConn;

            for (let i = 0; i < stockInfos.length; ++ i) {
                const req = stockInfos[i];
                const data = await this.fetchRuntimeData(req);
                await insertRuntimeData(dbConn, data);
            }

            this.interval = this.calcInterval();

        // } else {
        //     logger.debug('[' + this.TASK_NAME + '] skip.');
        //     this.interval = this.taskConfig.interval;
        // }
        super.setTimer();
    }
    
    fetchRuntimeData(req: Stock): Promise<RuntimeData> {
        return new Promise<RuntimeData>((resolve, reject) => {
            this.fetcher.fetchRuntime(req)
                .then(data => {
                    resolve(this.fetcher.makeRuntimeData(req, data));
                })
                .catch(err => {
                    logger.error('fetch runtime data failed - ' + req.code);
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