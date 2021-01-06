import { DataSource } from 'apollo-datasource'
import DBConnector from '../db-connector';
import { findStockDataById, findStockData, insertStockData, removeStockData, findRuntimeData, findDayData } from '../db/collection-helper';
import { StockData, DayData, DayDataSelectCondition, RuntimeData, RuntimeDataSelectCondtion } from '../definition/data-define';

export default class QLDataSource extends DataSource {
    
    context!: any;
    conn: DBConnector;
    

    constructor({connector}: any) {
        super();
        this.conn = (connector as DBConnector);
    }

    initialize(config: any) {
        this.context = config.context;
    }

    findStockInfos(): Promise<StockData[]> {
        return findStockData(this.conn);
    }

    findStockInfoById(id: number): Promise<StockData | null> {
        return findStockDataById(this.conn, id);
    }

    insertStockInfo(data: StockData): Promise<number> {
        return insertStockData(this.conn, data);
    }

    removeStockInfo(id: number): Promise<number> {
        return removeStockData(this.conn, id);
    }

    findRuntimeData(opts: RuntimeDataSelectCondtion): Promise<RuntimeData[]> {
        return findRuntimeData(this.conn, opts);
    }

    findDayData(opts: DayDataSelectCondition): Promise<DayData[]> {
        return findDayData(this.conn, opts);
    }
}