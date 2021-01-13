import DBConnector from "../db-connector";
import { TradeDay } from "../definition/data-define";
import { getDateString } from "./helper";
import NonTradeDay from './non-trade-day.json';

interface NonTradeDayObject {
    [key: string]: string[]
}

export function findTradeDays(db: DBConnector, begin: string, end?: string): Promise<TradeDay[]> {
    const opts = {
        sql: 'SELECT id, date, flag FROM m_trade_day WHERE date <= ? AND date >= ?',
        values: [begin, end || begin]
    };
    return new Promise<TradeDay[]>((resolve, reject) => {
        db.query(opts, (err, results) => {
            if (err) return reject(err);
            if (results && results.length > 0) {
                return resolve(results as TradeDay[]);
            }
            return resolve([]);
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
