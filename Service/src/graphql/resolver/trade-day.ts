import { TradeDay } from "../../definition/data-define";

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
        flag: (parent: any, args: any, context: any): Promise<number> => {
            return new Promise<number>((resolve, reject) => {
                context.dataSources.dsSystem.findTradeDay(args['date'])
                    .then((ret: TradeDay | null) => {
                        if (ret) {
                            resolve(ret.flag);
                        } else {
                            resolve(-1);
                        }
                    })
                    .catch((err: Error) => {
                        resolve(-1);
                    });
            });
        },
        many: (parent: any, args: any, context: any): Promise<TradeDay[]> => {
            return context.dataSources.dsSystem.findTradeDays(args['begin'], args['end']);            
        }
    },

    TradeDayMutation: {
        reset: (parent: any, args: any, context: any): Promise<boolean> => {
            return context.dataSources.dsSystem.resetTradeDay(args['year']);
        },
        setFlag: (parent: any, args: any, context: any): Promise<number> => {
            return context.dataSources.dsSystem.setTradeDayFlag(args['date'], args['flag']);
        }
    }
}