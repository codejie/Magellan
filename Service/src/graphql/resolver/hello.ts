// import { PubSub } from "apollo-server-fastify";
import { withFilter } from 'apollo-server-fastify';
import { pubsub } from './'
const SAY_HELLO = 'SAY_HELLO';

// const pubsub = new PubSub();

export default {
    Query: {
        hello: () => 'HELLO',
        datetime: () => new Date(),
        date: () => new Date(),
        time: () => new Date()
    },
    Subscription: {
        helloSaid: {
            // subscribe: (data: any) => {
            //     console.log('subscribe:' + data);
            //     return pubsub.asyncIterator([SAY_HELLO]);
            // },
            // resolve: (payload: any, args: any, context: any, info: any) => {
            //     return payload.data;
            // }
            // subscribe: withFilter(() => pubsub.asyncIterator(SAY_HELLO), (payload, variables) => {
            //     return true;
            // })
            // resolve: (payload: any, args: any, context: any, info: any) => {
            //     // Manipulate and return the new value
            //     return payload;
            // },
            // // subscribe: () => pubsub.asyncIterator(SAY_HELLO)
            subscribe: withFilter(() => pubsub.asyncIterator(SAY_HELLO), (data, variables) => {
                return true;//variables.msg === data.msg;
            })
        }
    },
    Mutation: {
        sayHello(root:any, args: any, context: any) {
            pubsub.publish(SAY_HELLO, { helloSaid: args.msg});
            return args.msg;
        }
    }
}