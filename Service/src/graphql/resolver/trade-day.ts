import { TradeDay } from "../../definition/data-define";
import { errorResult, makeResult, Result, ResultHeader } from "../result";

interface TradeDayResult extends Result {
    body?: TradeDay[];
}

export default {
    Query: {
        TradeDay: () => {
            return {};
        }
    },
    Mutation: {
        TradeDay: () => {
            return {};
        }
    },

    TradeDayQuery: {
        // flag: (parent: any, args: any, context: any): Promise<number> => {
        //     return new Promise<number>((resolve, reject) => {
        //         context.dataSources.dsSystem.findTradeDay(args['date'])
        //             .then((ret: TradeDay | null) => {
        //                 if (ret) {
        //                     resolve(ret.flag);
        //                 } else {
        //                     resolve(-1);
        //                 }
        //             })
        //             .catch((err: Error) => {
        //                 resolve(-1);
        //             });
        //     });
        // },
        many: async (parent: any, args: any, context: any): Promise<TradeDayResult> => {
            try {
                const results: TradeDay[] = await context.dataSources.dsSystem.findTradeDays(args['begin'], args['end']);
                return await makeResult(results);
            } catch (error) {
                return await errorResult(ResultHeader.SYSTEM_ERROR, error.toString());
            }
        },
        latest: async (parent: any, args: any, context: any): Promise<TradeDayResult> => {
            try {
                const result: TradeDay | null = await context.dataSources.dsSystem.findTradeDayLatest(args['date']);
                if (result) {
                    return await makeResult([result]);
                } else {
                    return await makeResult([]);
                }
            } catch (error) {
                return await errorResult(ResultHeader.SYSTEM_ERROR, error.toString());
            }
        }
    },

    TradeDayMutation: {
        reset: (parent: any, args: any, context: any): Promise<number> => {
            return context.dataSources.dsSystem.resetTradeDay(args['year']);
        },
        setFlag: (parent: any, args: any, context: any): Promise<number> => {
            return context.dataSources.dsSystem.setTradeDayFlag(args['date'], args['flag']);
        }
    }
}