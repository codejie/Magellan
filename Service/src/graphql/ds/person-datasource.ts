import { DataSource } from "apollo-datasource";
import DBConnector from "../../db-connector";

export default class QLPersonDataSource extends DataSource {
    context!: any;
    conn: DBConnector;

    constructor(connector: DBConnector) {
        super();
        this.conn = connector;
    }

    initialize(config: any) {
        this.context = config.context;
    }
    
    addPersonInfo(name: string): Promise<number> {
        return addPersonInfo(name);
    }
}