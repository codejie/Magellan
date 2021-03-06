import { threadId } from "worker_threads";
import { App } from "./app";
import { StockRuntimeData, StockDayData } from "./definition/data-define";
import { Stock } from "./definition/struct-define";
import NetEaseFetcher from "./fetcher/netease-fetcher";
import { makeStockCode } from "./fetcher/netease-util";
import Module from "./module";

export default class DataFetcher extends Module {
    
    fetcher!: NetEaseFetcher;

    constructor(app: App) {
        super(app);
        this.fetcher = new NetEaseFetcher();
    }

    init(): Promise<void> {
        return super.init();
    }

    start(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            resolve();
        });
    }

    fetchRuntimeData(req: Stock): Promise<StockRuntimeData> {
        return new Promise<StockRuntimeData>((resolve, reject) => {
            this.fetcher.fetchRuntime(req)
                .then(data => {
                    resolve(this.fetcher.makeRuntimeData(req, data));
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

    fetchDayData(req: Stock): Promise<StockDayData> {
        return new Promise<StockDayData>((resolve, reject) => {
            this.fetcher.fetchRuntime(req)
                .then(data => {
                    return this.fetcher.makehDayData(req, data);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

}