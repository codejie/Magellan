import { EventEmitter } from "events";
import DataServer from "./data-server";
import DBConnector from "./db-connector";
import { findBaseInfos } from "./db/collection-helper";
import { BaseInfo } from "./definition/data-define";
import { StockInfo } from "./definition/struct-define";
import Tasks from "./task";

export interface ConfigObject {
    Logger: object,
    Database: object,
    Loop: object
    // Server: object,
    // Services: object,
}

export class App extends EventEmitter {
    readonly config: ConfigObject;

    dbConn: DBConnector;
    tasks: Tasks;
    // scheduler!: Scheduler;
    // dataFetcher!: DataFetcher;
    dataServer: DataServer;

    stockInfos: StockInfo[]= [];

    constructor(config: ConfigObject) {
        super();
        this.config = config;

        this.dbConn = new DBConnector(this);
        this.tasks = new Tasks(this);
        // this.dataFetcher = new DataFetcher(this);
        // this.scheduler = new Scheduler(this);
        this.dataServer = new DataServer(this);
    }

    async init(): Promise<void> {

        // this.initEventCallbacks();

        await this.dbConn.init();
        await this.tasks.init();
        // await this.dataFetcher.init();
        // await this.scheduler.init();

        await this.dataServer.init();

        await this.loadBaseInfo();
    }

    async start(): Promise<void> {
        await this.dbConn.start();
        await this.tasks.start();
        // await this.dataFetcher.start();
        // await this.scheduler.start();

        await this.dataServer.start();
    }

    async shutdown(): Promise<void> {
        await this.dataServer.shutdown();

        // await this.scheduler.shutdown();
        // await this.dataFetcher.shutdown();
        await this.tasks.shutdown();
        await this.dbConn.shutdown();
    }

    // private initEventCallbacks(): void {
    //     this.on(EVENT_LOOP, this.onLoopCallback.bind(this));

    // }

    // private async onLoopCallback(data?: any): Promise<void> {
    //     logger.debug('loop');
    //     for (let i = 0; i < this.stockInfos.length; ++ i) {
    //         const req = this.stockInfos[i].info;
    //         const data = await this.dataFetcher.fetchRuntimeData(req);
    //         await this.dbConn.insertRuntimeData(data);
    //     }
    // }

    private async loadBaseInfo(): Promise<void> {
        const infos: BaseInfo[] = await findBaseInfos(this.dbConn);// this.dbConn.findBaseInfos();
        infos.forEach(item => {
            this.stockInfos.push({
                info: item
            });
        });
    }

}