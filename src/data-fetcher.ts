import { App } from "./app";
import { EVENT_LOOP } from "./definition/const-define";
import NetEaseFetcher from "./fetcher/netease-fetcher";
import Module from "./module";

export default class DataFetcher extends Module {
    
    fetcher!: NetEaseFetcher;
    
    constructor(app: App) {
        super(app);
        this.fetcher = new NetEaseFetcher();
    }

    init(): Promise<void> {

        this.on(EVENT_LOOP, this.onLoop.bind(this));

        return super.init();
    }

    start(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            resolve();
        });
    }

    private onLoop(data: any): void {
        
    }
}