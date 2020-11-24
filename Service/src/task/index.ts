import { App } from "../app";
import Module from "../module";
import RuntimeDataTask from "./runtime-data-task";


export default class Tasks extends Module {

    runtimeData!: RuntimeDataTask; 

    constructor(app: App) {
        super(app);

        this.runtimeData = new RuntimeDataTask(app);
    }

    async init(): Promise<void> {
        await this.runtimeData.init();
    }

    async start(): Promise<void> {
        await this.runtimeData.start();
    }

    async shutdown(): Promise<void> {
        await this.runtimeData.shutdown();
    }
    
}