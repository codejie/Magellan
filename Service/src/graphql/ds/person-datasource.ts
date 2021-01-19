import { DataSource } from "apollo-datasource";
import DBConnector from "../../db-connector";
import { addPersonInfo, fetchPersonStockData, insertPersonStockData, insertPersonStockLog, removePersonStockData, updatePersonStockData } from "../../db/person-helper";
import { ACTION_STOCK_BUY, ACTION_STOCK_SELL, ACTION_STOCK_SHARE, PersonStockData } from "../../definition/data-define";

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
        let ret = -1;
        //fetch
        const stockData: PersonStockData[] = await fetchPersonStockData(this.conn, id, stockId);
        // update
        if (stockData.length === 1) {
            // calc
            const data = stockData[0];
            const p = data.total * data.price + (total * price) * (action === ACTION_STOCK_SELL ? -1 : 1 );
            const t = data.total + total * (action === ACTION_STOCK_SELL ? -1 : 1 );
            await updatePersonStockData(this.conn, id, stockId, t, p);
            ret = t;
        } else {
            if (action === ACTION_STOCK_BUY || action === ACTION_STOCK_SHARE) {
                await insertPersonStockData(this.conn, id, stockId, total, price);
                ret = total;
            }
            throw new Error('not exist');
        }
        await insertPersonStockLog(this.conn, id, stockId, action, total, price);
        
        return ret;
    }

    removeStockData(id: number, stockId: number): Promise<number> {
        return removePersonStockData(this.conn, id, stockId);
    }
}