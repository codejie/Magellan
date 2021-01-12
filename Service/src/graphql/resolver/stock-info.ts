import { StockData } from "../../definition/data-define";

export default {
    Query: {
        StockInfo: () => {
            return {};
        }
    },
    Mutation: {
        StockInfo: () => {
            return {};
        }
    },

    StockInfoQuery: {
        oneById: (parent: any, args: any, context: any): Promise<StockData> => {
            return context.dataSources.dsCollection.findStockInfoById(args['id']);            
        },
        many: (parent: any, args: any, context: any): Promise<StockData[]> => {
            return context.dataSources.dsCollection.findStockInfos();
        }        
    },

    StockInfoMutation: {
        add: (parent: any, args: any, context: any): Promise<number> => {
            return context.dataSources.dsCollection.insertStockInfo(args);
        },
        remove: (parent: any, args: any, context: any): Promise<number> => {
            return context.dataSources.dsCollection.removeStockInfo(args['id']);
        }
    }

}

// export  {
//     Query: {
//         baseInfos: async (parent: any, args: any, context: any, info: any) => {
//             const data: any[] = await context.dataSources.dsCollection.findBaseInfos();
//             const ret: any[] = [];
//             data.forEach(item => {
//                 ret.push({
//                     id: item.id,
//                     type: item.type,
//                     code: item.code
//                 });
//             });
//             return ret;
//         }
//     },
//     Mutation: {
//         addBaseInfo: (parent: any, args: any, context: any, info: any): Promise<number> => {
//             return context.dataSources.dsCollection.addBaseInfo(args);
//         }
//     },
//     TestQuery: {
//         all: () => {
//             return 'all';
//         }
//     }    
// }