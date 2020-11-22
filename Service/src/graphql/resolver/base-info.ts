
export default {
    Query: {
        baseInfos: async (parent: any, args: any, context: any, info: any) => {
            const data: any[] = await context.dataSources.dbConn.findBaseInfos();
            const ret: any[] = [];
            data.forEach(item => {
                ret.push({
                    id: item.id,
                    type: item.type,
                    code: item.code
                });
            });
            return ret;
        }
    },
    Mutation: {
        addBaseInfo: (parent: any, args: any, context: any, info: any): Promise<number> => {
            return context.dataSources.dbConn.addBaseInfo(args);
        }
    },
    TestQuery: {
        all: () => {
            return 'all';
        }
    }    
}