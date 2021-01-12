import { RuntimeData } from '../../definition/data-define';

export default {
    Query: {
        RuntimeData: () => {
            return {};
        }
    },

    RuntimeDataQuery: {
        data: (parent: any, args: any, context: any): Promise<RuntimeData[]> => {
            const opts = {
                id: args['id'],
                start: args['start'],
                end: args['end']
            };
            return context.dataSources.dsCollection.findRuntimeData(opts);
        }
    }
}