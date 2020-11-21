import { DataSource } from 'apollo-datasource'
import DBConnector from '../db-connector';

export default class QLDataSource extends DataSource {
    
    context!: any;
    // conn: DBConnector;
    

    constructor() {
        super();
        // this.conn = connector;
    }

    initialize(config: any) {
        this.context = config.context;
    }

}