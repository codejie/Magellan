import DBConnector from "../db-connector";
import { StockInfo, RuntimeData, RuntimeDataSelectCondtion, TradeDay, StockDayData } from "../definition/data-define";
import logger from "../logger";
import { assembleInsertSqlOpts, getDateString } from "./helper";

// function getDateString(date: Date): string {
//     return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
// }

export function findStockData(db: DBConnector, id?: number): Promise<StockInfo[]> {
    const opts = {
        sql: 'SELECT id,type,code,market,name,created FROM m_base_info \
                WHERE state=1',
        values: []
    };
    if (id) {
        opts.sql += ' AND id=?',
        (opts.values as any[]).push(id);
    }

    return new Promise<StockInfo[]>((resolve, reject) => {
        db.query(opts, (err, results) => {
            if (err) return reject(err);
            const ret:StockInfo[] = [];
            if (results && results.length > 0) {
                results.forEach((r: any) => {
                    ret.push(r as StockInfo);
                });
            }
            resolve(ret);
        });    
    });
}

// export function findStockDataById(db: DBConnector, id: number): Promise<StockData | null> {
//     const opts = {
//         sql: 'SELECT id,type,code,market,name,created FROM m_base_info \
//                 WHERE state=1 AND id=?',
//         values: [id]
//     };
//     return new Promise<StockData | null>((resolve, reject) => {
//         db.query(opts, (err, results) => {
//             if (err) return reject(err);
//             if (results && results.length > 0) {
//                 resolve(results[0] as StockData);
//             } else {
//                 resolve(null);
//             }
//         });
//     });
// }

export function insertStockData(db: DBConnector, data: StockInfo): Promise<number> {
    const opts = assembleInsertSqlOpts('m_base_info', data);
    return new Promise<number>((resolve, reject) => {
        db.execute(opts, (err, result) => {
            if (err) return reject(err);
            resolve(result.insertId);
        });
    });
}

export function removeStockData(db: DBConnector, id: number): Promise<number> {
    const opts = {
        sql: 'DELETE FROM m_base_info WHERE id=?',
        values: [id]
    };
    return new Promise<number>((resolve, reject) => {
        db.execute(opts, (err, result) => {
            if (err) return reject(err);
            resolve(result.affectedRows);
        });
    });        
}

export function insertRuntimeData(db: DBConnector, data: RuntimeData): Promise<void> {
    const opts = assembleInsertSqlOpts('m_runtime_data', data);

    logger.debug('sql = ' + opts.sql);

    return new Promise<void>((resolve, reject) => {
    db.execute(opts, (err, result) => {
            if (err) return reject(err);
            resolve();
        });
    });
}

export function hasTodayDayData(db: DBConnector, id: number, date: Date): Promise<boolean> { // false: not exist, true: exist
    const opts = {
        sql: 'SELECT COUNT(ID) as ret FROM m_day_data WHERE id=? AND todaydate=?',
        values: [id, getDateString(date)]
    };

    return new Promise<boolean>((resolve, reject) => {
        db.query(opts, (err, results) => {
            if (err) return reject(err);
            resolve(results.length > 0 && results[0].ret > 0);
        });
    });
}

export async function insertDayData(db: DBConnector, date: Date, id: number, open: number, close: number): Promise<void> {
    const opts = {
        sql: 'INSERT INTO m_day_data (id,todayopen,yestclose,todaydate) VALUES (?,?,?,?)',
        values: [id, open, close, date]
    };
    return new Promise<void>((resolve, reject) => {
        db.execute(opts, (err, result) => {
            if (err) return reject(err);
            resolve();
        });
    });
}

export function updateDayData(db: DBConnector, date: Date, id: number, close?: number): Promise<void> {
    const opts = {
        sql: 'UPDATE m_day_data SET todayclose=? WHERE id=? AND todaydate=?',
        values: [close || -1, id, getDateString(date)]
    };
    return new Promise<void>((resolve, reject) => {
        db.execute(opts, (err, result) => {
            if (err) return reject(err);
            resolve();
        });
    });     
}

export async function insertTodayDayData(db: DBConnector, data: StockDayData): Promise<void> {
    const opts = {
        sql: 'INSERT INTO m_day_data (id,todayopen,yestclose,todaydate) VALUES (?,?,?,?)',
        values: [data.id, data.todayopen, data.yestclose, data.todaydate]
    };
    return new Promise<void>((resolve, reject) => {
        db.execute(opts, (err, result) => {
            if (err) return reject(err);
            resolve();
        });
    });
}

export function updateYesterdayDayData(db: DBConnector, data: StockDayData): Promise<void> {
    const date: Date = new Date(data.todaydate);
    date.setDate(date.getDate() - 1);
    const opts = {
        sql: 'UPDATE m_day_data SET todayclose=? WHERE id=? AND todaydate=?',
        values: [data.todayclose, data.id, getDateString(date)]
    };
    return new Promise<void>((resolve, reject) => {
        db.execute(opts, (err, result) => {
            if (err) return reject(err);
            resolve();
        });
    });     
}

export function findRuntimeData(db: DBConnector, condition: RuntimeDataSelectCondtion): Promise<RuntimeData[]> {
    const opts = {
        sql: 'SELECT id,price,high,low,percent,updown,bid1,bidvol1,bid2,bidvol2,bid3,bidvol3,bid4,bidvol4,bid5,bidvol5, \
                ask1,askvol1,ask2,askvol2,ask3,askvol3,ask4,askvol4,ask5,askvol5,volume,turnover,updated,created \
            FROM m_runtime_data \
                WHERE id=? AND updated >=? AND updated <?',
        values: [condition.id, condition.start, condition.end]
    };
    return new Promise<RuntimeData[]>((resolve, reject) => {
        db.query(opts, (err, results) => {
            if (err) return reject(err);
            if (results && results.length > 0) {
                return resolve(results as RuntimeData[]);
            }
            return resolve([]);
        });
    });    
}

export function findDayData(db: DBConnector, id?: number, start?: Date, end?: Date): Promise<StockDayData[]> {
    const opts = {
        sql: 'SELECT id,todayopen,yestclose,todayclose,todaydate,created FROM m_day_data',
        values: []
    };
    if (id || start || end) {
        opts.sql += ' WHERE';
        if (id) {
            opts.sql += 'id=?';
            (opts.values as any[]).push(id);
        }
        if (start) {
            if (opts.values.length > 0) {
                opts.sql += ' AND todaydate>=?';
            } else {
                opts.sql += ' todaydate>=?';
            }
            (opts.values as any[]).push(start);
        }
        if (end) {
            if (opts.values.length > 0) {
                opts.sql += ' AND todaydate<?';
            } else {
                opts.sql += ' todaydate<?';
            }
            (opts.values as any[]).push(end);
        }        
    }
    return new Promise<StockDayData[]>((resolve, reject) => {
        db.query(opts, (err, results) => {
            if (err) return reject(err);
            if (results && results.length > 0) {
                return resolve(results as StockDayData[]);
            }
            return resolve([]);
        });
    }); 
}
