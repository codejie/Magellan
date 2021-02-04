import { comparePasswd, makeToken } from "../../db/helper";
import { PersonFundData, PersonInfo, PersonStockData, PersonStockLog } from "../../definition/data-define";
import { registerToken } from "../../system-buffer";
import { errorResult, makeResult, Result, ResultHeader } from "../result";

interface PersonInfoResult extends Result {
    body?: PersonInfo[]
}

interface PersonStockDataResult extends Result {
    body?: PersonStockData[]
}

interface PersonStockLogResult extends Result {
    body?: PersonStockLog[]
}

interface PersonFundDataResult extends Result {
    body?: PersonFundData
}

export default {
    Query: {
        Person: () => { return {}; }
    }, 

    Mutation: {
        Person: () => { return {}; }
    },

    PersonMutation: {
        add: (parent: any, args: any, context: any): Promise<number> => {
            return context.dataSources.dsPerson.addPersonInfo(args['name'], args['passwd'])                        
        },
        updateStockData: (parent: any, args: any, context: any): Promise<number> => {
            return context.dataSources.dsPerson.updateStockData(args['id'], args['stockId'], args['action'], args['total'], args['price']);
        },
        removeStockData: (parent: any, args: any, context: any): Promise<number> => {
            return context.dataSources.dsPerson.removeStockData(args['id'], args['stockId']);
        },
        updateFundData: (parent: any, args: any, context: any): Promise<number> => {
            return context.dataSources.dsPerson.updateFundData(args['id'], args['base'], args['valid']);
        },
        removeToken: (parent: any, args: any, context: any): Promise<void> => {
            const id = context.id;
            return context.dataSources.dsPerson.removeTokenId(id);
        }        
    },

    PersonQuery: {
        // one: (parent: any, args: any, context: any): Promise<PersonInfo | null> => {
        //     return context.dataSources.dsPerson.fetchPersonInfo(args['id']);
        // },
        all: async (parent: any, args: any, context: any): Promise<PersonInfoResult> => {
            try {
                const results: PersonInfo[] = await context.dataSources.dsPerson.fetchPersonInfos();
                return await makeResult(results);
            } catch (error) {
                return await errorResult(ResultHeader.SYSTEM_ERROR, error.toString());
            }
        },
        stockData: async (parent: any, args: any, context: any): Promise<PersonStockDataResult> => {
            try {
                const id = context.id;
                if (id) {
                    const results: PersonStockData[] = await context.dataSources.dsPerson.fetchStockData(id, args['stockId']);
                    return await makeResult(results);
                } else {
                    return await errorResult(ResultHeader.INVALID_TOKEN);
                }
            } catch (error) {
                return await errorResult(ResultHeader.SYSTEM_ERROR, error.toString());
            }
        },
        stockLogs: async (parent: any, args: any, context: any): Promise<PersonStockLogResult> => {
            try {
                const id = context.id;
                if (id) {
                    const results: PersonStockLog[] = await context.dataSources.dsPerson.fetchStockLog(id, args['stockId'], args['begin'], args['end']);
                    return await makeResult(results);
                } else {
                    return await errorResult(ResultHeader.INVALID_TOKEN);
                }
            } catch (error) {
                return await errorResult(ResultHeader.SYSTEM_ERROR, error.toString());
            }
        },
        fundData: async (parent: any, args: any, context: any): Promise<PersonFundDataResult> => {
            try {
                const id = context.id;
                if (id) {
                    const result: PersonFundData = context.dataSources.dsPerson.fetchFundData(id);
                    return await makeResult(result);
                } else {
                    return await errorResult(ResultHeader.INVALID_TOKEN);
                }
            } catch (error) {
                return await errorResult(ResultHeader.SYSTEM_ERROR, error.toString());
            }
        },
        token: async (parent: any, args: any, context: any, info: any): Promise<Result> => {
            const personInfo: PersonInfo | null = await context.dataSources.dsPerson.fetchPersonInfoByName(args['name']);
            if (personInfo) {
                if (comparePasswd(args['passwd'], info.passwd)) {
                    const seed: string = info.name + info.id + (new Date()).getTime();
                    const token = makeToken(seed);
                    registerToken(info.id, token);
                    return {
                        header: ResultHeader.OK,
                        body: {
                            name: info.name,
                            flag: info.flag,
                            token
                        }
                    };
                }
            }
            return {
                header: ResultHeader.INVALID_TOKEN
            };
        },
        refreshToken: (): Promise<Result> => {
            return makeResult(ResultHeader.OK);
        }
    }
}