import DBConnector from "../db-connector";
import { TradeDay } from "../definition/data-define";

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
