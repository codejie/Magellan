import { ApolloServer, gql } from "apollo-server-fastify";
import fastify from "fastify";
import { App } from "./app";
import logger from "./logger";
import Module from "./module";

import { typeDefs, resolvers, QLDataSource } from "./graphql"

export default class DataServer extends Module {

    server!: ApolloServer;

    constructor(app: App) {
        super(app);
    }

    init(): Promise<void> {
        const qlDataSource = new QLDataSource({
            connector: this.app.dbConn
        });

        this.server = new ApolloServer({
            typeDefs,
            resolvers,
            logger: logger,
            // subscriptions: '/subscriptions',
            subscriptions: {
                path: '/subscriptions',
                // keepAlive: 
                onConnect: (connectionParams: any, websocket: any, context: any): any => {
                    logger.debug('subscriptions connected.');
                    // context['connectionParams'] = connectionParams;
                    return {};
                },
                onDisconnect: (webSocket, context): any => {
                    logger.debug('subscriptions disconnected.');
                }      
            },
            dataSources: () => {
                return {
                    dbConn: qlDataSource//new QLDataSource(this.app.dbConn)
                };
            },
            uploads: false
        });

        return super.init();
    }

    start(): Promise<void> {

        const app = fastify();
        this.server.installSubscriptionHandlers(app.server);
        app.register(this.server.createHandler());
        return new Promise<void>((resolve, reject) => {
            app.listen(3000)
                .then(ret => {
                    logger.debug(ret);
                    resolve();
                })
                .catch(err => {
                    reject(err);
                });
        });
    }
    
}