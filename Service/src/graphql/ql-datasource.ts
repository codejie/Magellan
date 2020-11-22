import { DataSource } from 'apollo-datasource'
import { resolve } from 'path';
import DBConnector from '../db-connector';
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
        return this.conn.findBaseInfos();
    }

    findBaseInfoById(id: number): Promise<BaseInfo | null> {
        return this.conn.findBaseInfoById(id);
    }

    insertBaseInfo(data: BaseInfo): Promise<number> {
        return this.conn.insertBaseInfo(data);
    }

    removeBaseInfo(id: number): Promise<number> {
        return this.conn.removeBaseInfo(id);
    }
}