import { EventEmitter } from "events";
import DataServer from "./data-server";
import DBConnector from "./db-connector";
import Tasks from "./task";

export interface ConfigObject {
    Logger: object,
    Database: object,
    Tasks: object,
    // Loop: object
    // Server: object,
    // Services: object,
}

export class App extends EventEmitter {
    readonly config: ConfigObject;

    dbConn: DBConnector;
    tasks: Tasks;
    dataServer: DataServer;

    // stockInfos: StockInfo[]= [];
    constructor(config: ConfigObject) {
        super();
        this.config = config;

        this.dbConn = new DBConnector(this);
        this.tasks = new Tasks(this);
        this.dataServer = new DataServer(this);
    }

    async init(): Promise<void> {
        await this.dbConn.init();
        await this.tasks.init();
        await this.dataServer.init();

        // await this.loadBaseInfo();
    }

    async start(): Promise<void> {
        await this.dbConn.start();
        await this.tasks.start();
        await this.dataServer.start();
    }

    async shutdown(): Promise<void> {
        await this.dataServer.shutdown();
        await this.tasks.shutdown();
        await this.dbConn.shutdown();
    }

    // private async loadBaseInfo(): Promise<void> {
    //     const infos: StockData[] = await findStockData(this.dbConn);// this.dbConn.findBaseInfos();
    //     infos.forEach(item => {
    //         this.stockInfos.push({
    //             info: item
    //         });
    //     });
    // }

}