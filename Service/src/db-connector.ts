import { default as MySQL, Pool, queryCallback, QueryOptions } from "mysql";
import { BaseInfo, RuntimeData } from "./definition/data-define";
import logger from "./logger";
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

    query(opts: string | QueryOptions, callback?: queryCallback): void | Promise<any> {
        if (callback) {
            this.pool.query(opts, callback);
        } else {
            return new Promise<Object>((resolve, reject) => {
                this.pool.query(opts, (err, results) => {
                    if (err) return reject(err);
                    resolve(results);
                });          
            });
        }
    }

    execute(opts: string | QueryOptions, callback?: (error: Error | null, result: any) => void): void | Promise<any> {
        this.pool.query(opts, (err, results, fields) => {
            if (callback) {
                callback(err, results);
            } else {
                return new Promise<boolean>((resolve, reject) => {
                    if (err) return reject(err);
                    resolve(results);
                });
            }
        });
    }      

    findBaseInfos(): Promise<BaseInfo[]> {
        const sql = 'SELECT id,type,code,market,name FROM m_base_info WHERE state=1';
        return new Promise<BaseInfo[]>((resolve, reject) => {
            this.query(sql, (err, results) => {
                if (err) return reject(err);
                const ret:BaseInfo[] = [];
                if (results && results.length > 0) {
                    results.forEach((r: any) => {
                        ret.push(r as BaseInfo);
                    });
                }
                resolve(ret);
            });    
        });
    }

    findBaseInfoById(id: number): Promise<BaseInfo | null> {
        const opts = {
            sql: 'SELECT id,type,code,market,name FROM m_base_info \
                    WHERE state=1 AND id=?',
            values: [id]
        };
        return new Promise<BaseInfo | null>((resolve, reject) => {
            this.query(opts, (err, results) => {
                if (err) return reject(err);
                if (results && results.length > 0) {
                    resolve(results[0] as BaseInfo);
                }
            });
        });
    }

    insertBaseInfo(data: BaseInfo): Promise<number> {
        const opts = this.assembleInsertSqlOpts('m_base_info', data);
        return new Promise<number>((resolve, reject) => {
            this.execute(opts, (err, result) => {
                if (err) return reject(err);
                resolve(result.insertId);
            });
        });
    }

    removeBaseInfo(id: number): Promise<number> {
        const opts = {
            sql: 'DELETE FROM m_base_info WHERE id=?',
            values: [id]
        };
        return new Promise<number>((resolve, reject) => {
            this.execute(opts, (err, result) => {
                if (err) return reject(err);
                resolve(result.affectedRows);
            });
        });        
    }

    insertRuntimeData(data: RuntimeData): Promise<void> {
        const opts = this.assembleInsertSqlOpts('m_runtime_data', data);

        logger.debug('sql = ' + opts.sql);

        return new Promise<void>((resolve, reject) => {
            this.execute(opts, (err, result) => {
                if (err) return reject(err);
                resolve();
            });
        });
    }

    private assembleInsertSqlOpts(table: string, data: any): MySQL.QueryOptions {
        const cols = Object.keys(data).join(',');
        let holders = '';
        const values = [];
        const items = Object.values(data);
        for (let i = 0; i < items.length; ++ i) {
            holders += '?';
            values.push(items[i]);
            if (i != items.length - 1) {
                holders += ',';
            }
        }
        return {
            sql: 'INSERT INTO ' + table + ' (' + cols + ') VALUES (' + holders + ')',
            values: values
        };        
    }
}