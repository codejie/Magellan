import DBConnector from "../db-connector";
import { BaseInfo, DayData, RuntimeData } from "../definition/data-define";
import logger from "../logger";
import { assembleInsertSqlOpts } from "./helper";

function getDateString(date: Date): string {
    return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
}

export function findBaseInfos(db: DBConnector): Promise<BaseInfo[]> {
    const sql = 'SELECT id,type,code,market,name FROM m_base_info WHERE state=1';
    return new Promise<BaseInfo[]>((resolve, reject) => {
        db.query(sql, (err, results) => {
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

export function findBaseInfoById(db: DBConnector, id: number): Promise<BaseInfo | null> {
    const opts = {
        sql: 'SELECT id,type,code,market,name FROM m_base_info \
                WHERE state=1 AND id=?',
        values: [id]
    };
    return new Promise<BaseInfo | null>((resolve, reject) => {
        db.query(opts, (err, results) => {
            if (err) return reject(err);
            if (results && results.length > 0) {
                resolve(results[0] as BaseInfo);
            }
        });
    });
}

export function insertBaseInfo(db: DBConnector, data: BaseInfo): Promise<number> {
    const opts = assembleInsertSqlOpts('m_base_info', data);
    return new Promise<number>((resolve, reject) => {
        db.execute(opts, (err, result) => {
            if (err) return reject(err);
            resolve(result.insertId);
        });
    });
}

export function removeBaseInfo(db: DBConnector, id: number): Promise<number> {
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

export async function insertTodayDayData(db: DBConnector, data: DayData): Promise<void> {
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

export function updateYesterdayDayData(db: DBConnector, data: DayData): Promise<void> {
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