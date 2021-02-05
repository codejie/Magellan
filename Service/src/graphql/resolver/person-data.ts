import { comparePasswd, makeToken } from "../../db/helper";
import { PersonFundData, PersonInfo, PersonStockData, PersonStockLog } from "../../definition/data-define";
import { fetchToken, registerToken, unregisterId } from "../../system-buffer";
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

interface TokenResult extends Result {
    body?: {
        name: string,
        flag: number,
        token: string
    }
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
        removeToken: (parent: any, args: any, context: any): Promise<Result> => {
            try {
                const id = context.id;
                if (id) {
                    unregisterId(id);
                }
                return makeResult();
            } catch (error) {
                return errorResult(ResultHeader.SYSTEM_ERROR, error.toString());
            }
        },
        refreshToken: async (parent: any, args: any, context: any): Promise<TokenResult> => {
            try {
                const id = context.id;
                if (id) {
                    const result: PersonInfo | null = await context.dataSources.dsPerson.fetchPersonInfo(id);
                    if (result) {
                        const seed: string = result.name + result.id + (new Date()).getTime();
                        const token = makeToken(seed);
                          return await makeResult({
                            name: result.name,
                            flag: result.flag,
                            token                            
                        });
                    }
                }
                return await errorResult(ResultHeader.INVALID_TOKEN);
            } catch (error) {
                return await errorResult(ResultHeader.SYSTEM_ERROR, error.toString());
            }
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
        token: async (parent: any, args: any, context: any, info: any): Promise<TokenResult> => {
            try {
                const result: PersonInfo | null = await context.dataSources.dsPerson.fetchPersonInfoByName(args['name']);
                if (result) {
                    if (comparePasswd(args['passwd'], result.passwd)) {
                        const seed: string = result.name + result.id + (new Date()).getTime();
                        const token = makeToken(seed);
                        registerToken(result.id, token);
                        return await makeResult({
                            name: result.name,
                            flag: result.flag,
                            token                            
                        });
                    }
                }
                return await errorResult(ResultHeader.INVALID_TOKEN);
            } catch (error) {
                return await errorResult(ResultHeader.SYSTEM_ERROR, error.toString());
            }
        }
    }
}