import baseInfo from "./base-info"

export default {
    Query: {
        test: async (parent: any, args: any, context: any, info: any) => {
            return {}
        }
    },
    TestQuery: {
        single: () => {
            return {
                a: 'a',
                b: 1
            };
        },
        array: () => {
            const ret: any[] = [];
            ret.push({
                a: 'a',
                b: 1                
            });
            return ret;
        }
    }
}