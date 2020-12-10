import { BaseInfo } from "../../definition/data-define";

export default {
    Query: {
        BaseInfo: () => {
            return {};
        }
    },
    Mutation: {
        BaseInfo: () => {
            return {};
        }
    },

    BaseInfoQuery: {
        oneById: (parent: any, args: any, context: any): Promise<BaseInfo> => {
            return context.dataSources.dbConn.findBaseInfoById(args['id']);            
        },
        // many: async (parent: any, args: any, context: any, info: any) => {
        //     const data: BaseInfo[] = await context.dataSources.dbConn.findBaseInfos();
        //     const ret: any[] = [];
        //     data.forEach(item => {
        //         ret.push({
        //             id: item.id,
        //             type: item.type,
        //             code: item.code,
        //             market: item.market,
        //             name: item.name,
        //             created: item.created.toIOS
        //         });
        //     });
        //     return ret;
        // }
        many: (parent: any, args: any, context: any): Promise<BaseInfo[]> => {
            return context.dataSources.dbConn.findBaseInfos();
        }        
    },

    BaseInfoMutation: {
        add: (parent: any, args: any, context: any): Promise<number> => {
            return context.dataSources.dbConn.insertBaseInfo(args);
        },
        remove: (parent: any, args: any, context: any): Promise<number> => {
            return context.dataSources.dbConn.removeBaseInfo(args['id']);
        }
    }

}

// export  {
//     Query: {
//         baseInfos: async (parent: any, args: any, context: any, info: any) => {
//             const data: any[] = await context.dataSources.dbConn.findBaseInfos();
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
//             return context.dataSources.dbConn.addBaseInfo(args);
//         }
//     },
//     TestQuery: {
//         all: () => {
//             return 'all';
//         }
//     }    
// }