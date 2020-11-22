import { EventEmitter } from "events";
import DataFetcher from "./data-fetcher";
import DataServer from "./data-server";
import DBConnector from "./db-connector";
import { EVENT_BASEINFO_UPDATE, EVENT_LOOP } from "./definition/const-define";
import { BaseInfo } from "./definition/data-define";
import { StockInfo } from "./definition/struct-define";
import logger from "./logger";
import { Scheduler } from "./scheduler";

export interface ConfigObject {
    Logger: object,
    Database: object,
    Loop: object
    // Server: object,
    // Services: object,
}

export class App extends EventEmitter {
    readonly config: ConfigObject;

    dbConn!: DBConnector;
    scheduler!: Scheduler;
    dataFetcher!: DataFetcher;
    dataServer!: DataServer;

    stockInfos: StockInfo[]= [];

    constructor(config: ConfigObject) {
        super();
        this.config = config;

        this.dbConn = new DBConnector(this);
        this.dataFetcher = new DataFetcher(this);
        this.scheduler = new Scheduler(this);
        this.dataServer = new DataServer(this);
    }

    async init(): Promise<void> {

        this.initEventCallbacks();

        await this.dbConn.init();
        await this.dataFetcher.init();
        await this.scheduler.init();

        await this.dataServer.init();

        await this.loadBaseInfo();
    }

    async start(): Promise<void> {
        await this.dbConn.start();
        await this.dataFetcher.start();
        await this.scheduler.start();

        await this.dataServer.start();
    }

    async shutdown(): Promise<void> {
        await this.dataServer.shutdown();

        await this.scheduler.shutdown();
        await this.dataFetcher.shutdown();
        await this.dbConn.shutdown();
    }

    private initEventCallbacks(): void {
        this.on(EVENT_LOOP, this.onLoopCallback.bind(this));

    }

    private async onLoopCallback(data?: any): Promise<void> {
        logger.debug('loop');
        for (let i = 0; i < this.stockInfos.length; ++ i) {
            const req = this.stockInfos[i].info;
            const data = await this.dataFetcher.fetchRuntimeData(req);
            await this.dbConn.insertRuntimeData(data);
        }
    }

    private async loadBaseInfo(): Promise<void> {
        const infos: BaseInfo[] = await this.dbConn.findBaseInfos();
        infos.forEach(item => {
            this.stockInfos.push({
                info: item
            });
        });
    }

}