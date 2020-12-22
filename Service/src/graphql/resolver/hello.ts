// import { PubSub } from "apollo-server-fastify";
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
            subscribe: () => pubsub.asyncIterator([SAY_HELLO])
        }
    },
    Mutation: {
        sayHello(root:any, args: any, context: any) {
            pubsub.publish(SAY_HELLO, { helloSaid: args.msg});
            return args.msg;
        }
    }
}