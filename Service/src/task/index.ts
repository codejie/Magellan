import { App } from "../app";
import Module from "../module";
import DayDataTask from "./day-data-task";
import RuntimeDataTask from "./runtime-data-task";
import SystemInfoTask from "./system-info-task";


export default class Tasks extends Module {

    systemInfo: SystemInfoTask;
    runtimeData: RuntimeDataTask;
    dayData: DayDataTask;

    constructor(app: App) {
        super(app);

        this.systemInfo = new SystemInfoTask(app);
        this.runtimeData = new RuntimeDataTask(app);
        this.dayData = new DayDataTask(app);
    }

    async init(): Promise<void> {
        await this.systemInfo.init();
        await this.runtimeData.init();
        await this.dayData.init();
    }

    async start(): Promise<void> {
        await this.systemInfo.start();
        await this.runtimeData.start();
        await this.dayData.start();
    }

    async shutdown(): Promise<void> {
        await this.runtimeData.shutdown();
        await this.dayData.shutdown();
        await this.systemInfo.shutdown();
    }
    
    
}