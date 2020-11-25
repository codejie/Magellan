import { App } from "../app";
import Module from "../module";
import DayDataTask from "./day-data-task";
import RuntimeDataTask from "./runtime-data-task";


export default class Tasks extends Module {

    runtimeData: RuntimeDataTask;
    dayData: DayDataTask;

    constructor(app: App) {
        super(app);

        this.runtimeData = new RuntimeDataTask(app);
        this.dayData = new DayDataTask(app);
    }

    async init(): Promise<void> {
        await this.runtimeData.init();
        await this.dayData.init();
    }

    async start(): Promise<void> {
        await this.runtimeData.start();
        await this.dayData.start();
    }

    async shutdown(): Promise<void> {
        await this.runtimeData.shutdown();
        await this.dayData.shutdown();
    }
    
    
}