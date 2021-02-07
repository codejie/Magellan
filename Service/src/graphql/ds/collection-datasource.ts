import { DataSource } from 'apollo-datasource'
import DBConnector from '../../db-connector';
import { findStockData, insertStockData,
        removeStockData, findRuntimeData, findDayData } from '../../db/collection-helper';
import { StockInfo, DayDataSelectCondition,
        RuntimeData, RuntimeDataSelectCondtion, StockDayData  } from '../../definition/data-define';

export default class QLCollectionDataSource extends DataSource {
    
    context!: any;
    conn: DBConnector;

    constructor(connector: DBConnector) {
        super();
        this.conn = connector;
    }

    initialize(config: any) {
        this.context = config.context;
    }

    findStockInfos(id?: number): Promise<StockInfo[]> {
        return findStockData(this.conn, id);
    }

    // findStockInfoById(id: number): Promise<StockInfo | null> {
    //     return findStockDataById(this.conn, id);
    // }

    insertStockInfo(data: StockInfo): Promise<number> {
        return insertStockData(this.conn, data);
    }

    removeStockInfo(id: number): Promise<number> {
        return removeStockData(this.conn, id);
    }

    findRuntimeData(opts: RuntimeDataSelectCondtion): Promise<RuntimeData[]> {
        return findRuntimeData(this.conn, opts);
    }

    findDayData(id?: number, start?: Date, end?: Date): Promise<StockDayData[]> {
        return findDayData(this.conn, id, start, end);
    }

    // findTradeDays(begin: string, end: string): Promise<TradeDay[]> {
    //     return findTradeDays(this.conn, begin, end);
    // }

    // findTradeDay(date: string): Promise<TradeDay | null> {
    //     return new Promise<TradeDay | null>((resolve, reject) => {
    //         findTradeDays(this.conn, date).then(results => {
    //             if (results && results.length > 0) {
    //                 resolve(results[0]);
    //             } else {
    //                 resolve(null);
    //             }
    //         }).catch(err => {
    //             resolve(null);
    //         });
    //     });
    // }
}