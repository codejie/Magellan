import { DataSource } from "apollo-datasource";
import DBConnector from "../../db-connector";
import { comparePasswd, makeToken } from "../../db/helper";
import { insertPersonInfo, fetchPersonFundData, fetchPersonStockData, insertPersonFundData, insertPersonStockData, insertPersonStockLog, removePersonStockData, updatePersonFundData, updatePersonStockData, fetchPersonInfos, fetchPersonStockLog, fetchPersonInfoByName } from "../../db/person-helper";
import { ACTION_STOCK_BUY, ACTION_STOCK_SELL, ACTION_STOCK_SHARE, PersonFundData, PersonInfo, PersonStockData, PersonStockLog, PersonToken } from "../../definition/data-define";
import { registerToken, unregisterId } from "../../system-buffer";

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
    
    addPersonInfo(name: string, passwd: string): Promise<number> {
        return insertPersonInfo(this.conn, name, passwd);
    }

    fetchPersonInfo(id: number): Promise<PersonInfo | null> {
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
            const t = data.total + total * (action === ACTION_STOCK_SELL ? -1 : 1 );
            const p = t != 0 ? (data.total * data.price + (total * price) * (action === ACTION_STOCK_SELL ? -1 : 1 )) / t : 0.0;
            await updatePersonStockData(this.conn, id, stockId, t, p);
            ret = t;
        } else {
            if (action === ACTION_STOCK_BUY || action === ACTION_STOCK_SHARE) {
                await insertPersonStockData(this.conn, id, stockId, total, price);
                ret = total;
            } else {
                throw new Error('not exist');
            }
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

    async token(name: string, passwd: string): Promise<PersonToken> {
        const info: PersonInfo | null = await fetchPersonInfoByName(this.conn, name);
        if (info) {
            if (comparePasswd(passwd, info.passwd)) {
                const seed: string = info.name + info.id + (new Date()).getTime();
                const token = makeToken(seed);
                registerToken(info.id, token);
                return {
                    header: {
                        code: 0
                    },
                    body: {
                        name: info.name,
                        flag: info.flag,
                        token
                    }
                };
            }
        }
        return {
            header: {
                code: -1
            }
        };
    }

    removeTokenId(id: number): Promise<void> {
        return new Promise<void>((resolve) => {
            unregisterId(id);
            resolve();
        });
    }
}