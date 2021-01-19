
export default {
    Query: {
        Person: () => { return {}; }
    }, 

    Mutation: {
        Person: () => { return {}; }
    },

    PersonMutation: {
        add: (parent: any, args: any, context: any): Promise<number> => {
            return context.dataSources.dsPerson.addPersonInfo(args['name'])                        
        },
        updateStock: (parent: any, args: any, context: any): Promise<number> => {
            return context.dataSources.dsPerson.updateStockData(args['id'], args['stockId'], args['action'], args['total'], args['price']);
        },
        removeStock: (parent: any, args: any, context: any): Promise<number> => {
            return context.dataSources.dsPerson.removeStockData(args['id'], args['stockId'])
        },
        updateFundData: (parent: any, args: any, context: any): Promise<number> => {
        }
    },

    PersonQuery: {
        one: (parent: any, args: any, context: any): Promise<PersonInfo> => {

        },
        all: (parent: any, args: any, context: any): Promise<PersonInfo[]> => {

        },
        stockData: (parent: any, args: any, context: any): Promise<PersonStockData> => {
        },
        stockLogs: (parent: any, args: any, context: any): Promise<PersonStockLog> => {
        },
        fundData: (parent: any, args: any, context: any): Promise<PersonFundData> => {
        }

    }
}