import { DataSource } from 'apollo-datasource'
import DBConnector from '../db-connector';
import { findBaseInfoById, findBaseInfos, insertBaseInfo, removeBaseInfo, findRuntimeData, findDayData } from '../db/collection-helper';
import { BaseInfo, DayData, DayDataSelectCondition, RuntimeData, RuntimeDataSelectCondtion } from '../definition/data-define';

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

    findBaseInfos(): Promise<BaseInfo[]> {
        return findBaseInfos(this.conn);
    }

    findBaseInfoById(id: number): Promise<BaseInfo | null> {
        return findBaseInfoById(this.conn, id);
    }

    insertBaseInfo(data: BaseInfo): Promise<number> {
        return insertBaseInfo(this.conn, data);
    }

    removeBaseInfo(id: number): Promise<number> {
        return removeBaseInfo(this.conn, id);
    }

    findRuntimeData(opts: RuntimeDataSelectCondtion): Promise<RuntimeData[]> {
        return findRuntimeData(this.conn, opts);
    }

    findDayData(opts: DayDataSelectCondition): Promise<DayData[]> {
        return findDayData(this.conn, opts);
    }
}