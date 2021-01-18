import { DataSource } from "apollo-datasource";
import DBConnector from "../../db-connector";
import { addPersonInfo } from "../../db/person-helper";

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
        return addPersonInfo(this.conn, name);
    }

    async updateStockData(id: number, stockId: number, action: number, total: number, price: number): Promise<number> {
        //fetch

        // update     
    }
}