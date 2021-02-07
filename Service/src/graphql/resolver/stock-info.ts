import { StockDayData, StockInfo } from "../../definition/data-define";
import { errorResult, makeResult, Result, ResultHeader } from "../result";

interface StockInfoResult extends Result {
    body?: StockInfo[]
}

interface StockDayDataResult extends Result {
    body?: StockDayData[]
}

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
        // oneById: (parent: any, args: any, context: any): Promise<StockInfo> => {
        //     return context.dataSources.dsCollection.findStockInfoById(args['id']);            
        // },
        // many: (parent: any, args: any, context: any): Promise<StockInfo[]> => {
        //     return context.dataSources.dsCollection.findStockInfos();
        // },
        items: async (parent: any, args: any, context: any): Promise<StockInfoResult> => {
            try {
                const results = await context.dataSources.dsCollection.findStockInfos(args['id']);
                return await makeResult(results);
            } catch (error) {
                return await errorResult(ResultHeader.SYSTEM_ERROR, error.toString());
            };
        },
        dayData: async (parent: any, args: any, context: any): Promise<StockDayDataResult> => {
            try {
                const results = await context.dataSources.dsCollection.findDayData(args['id'], args['start'], args['end']);
                return await makeResult(results);
            } catch (error) {
                return await errorResult(ResultHeader.SYSTEM_ERROR, error.toString());
            };            
        },
        dayDataLatest: async (parent: any, args: any, context: any): Promise<StockDayDataResult> => {
            try {
                const date = await context.dataSources.dsSystem.findDayDataLatest();
                const results = await context.dataSources.dsCollection.findDayData(args['id'], date, date);
                return await makeResult(results);
            } catch (error) {
                return await errorResult(ResultHeader.SYSTEM_ERROR, error.toString());
            };               
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