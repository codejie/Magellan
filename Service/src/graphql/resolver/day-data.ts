import { DayData } from "../../definition/data-define";

export default {
    Query: {
        DayData: () => {
            return {}
        }
    },
    DayDataQuery: {
        data: (parent: any, args: any, context: any): Promise<DayData[]> => {
            const opts = {
                id: args['id'],
                start: args['start'],
                end: args['end']
            };
            return context.dataSources.dsCollection.findDayData(opts);
        }
    }
}