import { default as MySQL, Pool } from "mysql";
import Module from "./module";

interface DatabaseOptions {
    type: string,
    host: string,
    port: number,
    user?: string,
    password?: string,
    database?: string
}

export default class DBConnector extends Module {
    protected pool!: Pool;
    init(): Promise<void> {
        const opts = (this.config.Database as DatabaseOptions);
        return new Promise<void>((resolve, reject) => {
            this.pool = MySQL.createPool({
                host: opts.host,
                port: opts.port,
                user: opts.user,
                password: opts.password,
                database: opts.database
            });
            resolve();
        });
    }

    start(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            resolve();
        });
    }

    shutdown(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            if (this.pool) {
                this.pool.end(err => {
                    if (err) return reject(err);
                 });
            }
            resolve();
        });
    }
}