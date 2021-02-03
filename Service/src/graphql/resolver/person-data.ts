import { comparePasswd, makeToken } from "../../db/helper";
import { PersonFundData, PersonInfo, PersonStockLog } from "../../definition/data-define";
import { registerToken } from "../../system-buffer";
import { makeResult, Result, ResultHeader } from "../result";

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
        one: (parent: any, args: any, context: any): Promise<PersonInfo | null> => {
            return context.dataSources.dsPerson.fetchPersonInfo(args['id']);
        },
        all: (parent: any, args: any, context: any): Promise<PersonInfo[]> => {
            return context.dataSources.dsPerson.fetchPersonInfos();
        },
        stockData: (parent: any, args: any, context: any): Promise<Result> => {
            const id = context.id;
            if (id) {
                return context.dataSources.dsPerson.fetchStockData(id, args['stockId']);
            } else {
                return makeResult(ResultHeader.INVALID_TOKEN);
            }
        },
        stockLogs: (parent: any, args: any, context: any): Promise<PersonStockLog[]> => {
            return context.dataSources.dsPerson.fetchStockLog(args['id'], args['stockId'], args['begin'], args['end']);
        },
        fundData: (parent: any, args: any, context: any): Promise<PersonFundData> => {
            return context.dataSources.dsPerson.fetchFundData(args['id']);
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