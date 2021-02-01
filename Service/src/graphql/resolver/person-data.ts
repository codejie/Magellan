import { PersonFundData, PersonInfo, PersonStockData, PersonStockLog, PersonToken } from "../../definition/data-define";

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
        }
    },

    PersonQuery: {
        one: (parent: any, args: any, context: any): Promise<PersonInfo | null> => {
            return context.dataSources.dsPerson.fetchPersonInfo(args['id']);
        },
        all: (parent: any, args: any, context: any): Promise<PersonInfo[]> => {
            return context.dataSources.dsPerson.fetchPersonInfos();
        },
        stockData: (parent: any, args: any, context: any): Promise<PersonStockData[]> => {
            return context.dataSources.dsPerson.fetchStockData(args['id'], args['stockId']);
        },
        stockLogs: (parent: any, args: any, context: any): Promise<PersonStockLog[]> => {
            return context.dataSources.dsPerson.fetchStockLog(args['id'], args['stockId'], args['begin'], args['end']);
        },
        fundData: (parent: any, args: any, context: any): Promise<PersonFundData> => {
            return context.dataSources.dsPerson.fetchFundData(args['id']);
        },
        token: (parent: any, args: any, context: any, info: any): Promise<PersonToken | null> => {
            return context.dataSources.dsPerson.fetchToken(args['name'], args['passwd']);
        }
    }
}