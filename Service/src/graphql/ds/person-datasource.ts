import { DataSource } from "apollo-datasource";
import DBConnector from "../../db-connector";
import { insertPersonInfo, fetchPersonFundData, fetchPersonStockData, insertPersonFundData, insertPersonStockData, insertPersonStockLog, removePersonStockData, updatePersonFundData, updatePersonStockData, fetchPersonInfos, fetchPersonStockLog } from "../../db/person-helper";
import { ACTION_STOCK_BUY, ACTION_STOCK_SELL, ACTION_STOCK_SHARE, PersonFundData, PersonInfo, PersonStockData, PersonStockLog } from "../../definition/data-define";

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
        return insertPersonInfo(this.conn, name);
    }

    fetchPersonInfo(id: string): Promise<PersonInfo | null> {
        return new Promise<PersonInfo | null>((resolve, reject) => {
            fetchPersonInfos(this.conn, id)
                .then((ret: PersonInfo[]) => {
                    if (ret && ret.length > 0) {
                        resolve(ret[0]);
                    } else {
                        resolve(null)
                    }
                })
                .catch((err: Error) => {
                    reject(err);
                });
        });
    }

    fetchPersonInfos(): Promise<PersonInfo[]> {
        return fetchPersonInfos(this.conn);
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

    fetchStockData(id: number, stockId?: number): Promise<PersonStockData[]> {
        return fetchPersonStockData(this.conn, id, stockId);     
    }

    fetchStockLog(id: number, stockId?: number, begin?: Date, end?: Date): Promise<PersonStockLog[]> {
        return fetchPersonStockLog(this.conn, id, stockId, begin, end);
    }

    fetchFundData(id: number): Promise<PersonFundData | null> {
        return fetchPersonFundData(this.conn, id);        
    }

    async updateFundData(id: number, base: number, valid: number): Promise<number> {
        const data = await fetchPersonFundData(this.conn, id);
        if (data) {
            return await updatePersonFundData(this.conn, id, base, valid);
        } else {
            return await insertPersonFundData(this.conn, id, base);
        }
    }
}