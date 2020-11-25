import { DataSource } from 'apollo-datasource'
import DBConnector from '../db-connector';
import { findBaseInfoById, findBaseInfos, insertBaseInfo, removeBaseInfo } from '../db/collection-helper';
import { BaseInfo } from '../definition/data-define';

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
}