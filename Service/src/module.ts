import { EventEmitter } from "events";
import { resolve } from "path";
import { App, ConfigObject } from "./app";

export default abstract class Module extends EventEmitter {
    protected readonly app: App;
    protected readonly config: ConfigObject;
    constructor(app: App) {
        super();

        this.app = app;
        this.config = app.config;
    }

    init(): Promise<void> { return new Promise<void>((resolve, reject) => { resolve(); })}
    abstract start(): Promise<void>;
    shutdown(): Promise<void>  { return new Promise<void>((resolve, reject) => { resolve(); })}
}