import { EventEmitter } from "events";
import DBConnector from "./db-connector";
import { EVENT_LOOP } from "./definition/const-define";
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

    constructor(config: ConfigObject) {

        super();
        this.config = config;

        this.dbConn = new DBConnector(this);
        this.scheduler = new Scheduler(this);
    }

    async init(): Promise<void> {

        this.initEventCallbacks();

        await this.dbConn.init();
        await this.scheduler.init();
    }

    async start(): Promise<void> {
        await this.dbConn.start();
        await this.scheduler.start();
    }

    async shutdown(): Promise<void> {
        await this.scheduler.shutdown();
        await this.dbConn.shutdown();
    }

    private initEventCallbacks(): void {
        this.on(EVENT_LOOP, this.onLoopCallback.bind(this));
    }

    private async onLoopCallback(data?: any): Promise<void> {
        logger.debug('loop');
        
    }


}