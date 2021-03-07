import DBConnector from "../db-connector";
import { TradeDay } from "../definition/data-define";
import { getDateString } from "./helper";
import NonTradeDay from './non-trade-day.json';

interface NonTradeDayObject {
    [key: string]: string[]
}

export function findTradeDays(db: DBConnector, begin: Date, end?: Date): Promise<TradeDay[]> {
    const opts = {
        sql: 'SELECT id, date, flag FROM m_trade_day WHERE date >= ? AND date <= ?',
        values: [getDateString(begin), end ? getDateString(end) : getDateString(begin)]
    };
    return new Promise<TradeDay[]>((resolve, reject) => {
        db.query(opts, (err, results) => {
            if (err) return reject(err);
            if (results && results.length > 0) {
                resolve(results as TradeDay[]);
            } else {
                resolve([]);
            }
        });
    });
}

export function findTradeDayLatest(db: DBConnector, date: Date): Promise<TradeDay | null> {
    const opts = {
        sql: 'SELECT id, date, flag FROM m_trade_day WHERE date <= ? ORDER BY date DESC LIMIT 1',
        values: [getDateString(date)]
    };
    return new Promise<TradeDay | null>((resolve, reject) => {
        db.query(opts, (err, results) => {
            if (err) return reject(err);
            if (results && results.length > 0) {
                resolve(results[0] as TradeDay);
            } else {
                resolve(null);
            }
        });
    });    
}

export function removeTradeDay(db: DBConnector, year: string): Promise<number> {
    const opts = {
        sql: 'DELETE FROM m_trade_day WHERE date >= ? AND date <= ?',
        values: [year + '-01-01', year + '-12-31']
    };
    return new Promise<number>((resolve, reject) => {
        db.execute(opts, (err, result) => {
            if (err) return reject(err);
            resolve(result.affectedRows);
        });      
    });
}

export function updateTradeDay(db: DBConnector, year: string): Promise<number> {
    const data: any[] = [];

    const excludeDays: string[] = (NonTradeDay as NonTradeDayObject)[year] || [];
    const date = new Date(year + "-01-01");
    while (date.getFullYear().toString() === year) {
        if (date.getDay() === 0 || date.getDay() === 6 || excludeDays.includes(getDateString(date))) {
            date.setDate(date.getDate() + 1);
            continue;
        }

        data.push([getDateString(date), 0]);

        date.setDate(date.getDate() + 1);
    }

    const opts = {
        sql: 'INSERT INTO m_trade_day (date,flag) VALUES ?',
        values: [data]
    };    
    return new Promise<number>((resolve, reject) => {
        db.execute(opts, (err, result) => {
            if (err) return reject(err);
            resolve(data.length);
        });
    });
}

export function setTradeDayFlag(db: DBConnector, date: Date, flag?: number): Promise<number> {
    const opts = {
        sql: 'UPDATE m_trade_day SET flag=? WHERE date=?',
        values: [flag || 0, getDateString(date)]
    };
    return new Promise<number>((resolve, reject) => {
        db.execute(opts, (err, result) => {
            if (err) return reject(err);
            resolve(flag || 0);
        });
    });    
}

export function getBeforeTradeDay(db: DBConnector, date: Date): Promise<Date | null> {
    const opts = {
        sql: 'SELECT date, flag FROM m_trade_day WHERE date < ? ORDER BY date DESC LIMIT 1',
        values: [getDateString(date)]
    };
    return new Promise<Date | null>((resolve, reject) => {
        db.query(opts, (err, results) => {
            if (err) return reject(err);
            if (results.length === 1) {
                resolve(results[0].date);
            } else {
                resolve(null);
            }
        });
    });
}
