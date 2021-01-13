import { DataSource } from "apollo-datasource";
import DBConnector from "../db-connector";
import { findTradeDays, updateTradeDay } from "../db/system-helper";
import { TradeDay } from "../definition/data-define";

export default class QLSystemDataSource extends DataSource {
    context!: any;
    conn: DBConnector;

    constructor(connector: DBConnector) {
        super();
        this.conn = connector;
    }

    initialize(config: any) {
        this.context = config.context;
    }

    findTradeDay(date: string): Promise<TradeDay | null> {
        return new Promise<TradeDay | null>((resolve, reject) => {
            findTradeDays(this.conn, date).then(results => {
                if (results && results.length > 0) {
                    resolve(results[0]);
                } else {
                    resolve(null);
                }
            }).catch(err => {
                resolve(null);
            });
        });
    }
    
    findTradeDays(begin: string, end: string): Promise<TradeDay[]> {
        return findTradeDays(this.conn, begin, end);
    }
    
    resetTradeDay(year: string): Promise<number> {
        return updateTradeDay(this.conn, year);
    }
}