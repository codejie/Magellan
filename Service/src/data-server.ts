import { ApolloServer, gql } from "apollo-server-fastify";
import fastify from "fastify";
import { App } from "./app";
import logger from "./logger";
import Module from "./module";

import { typeDefs, resolvers, QLCollectionDataSource, QLSystemDataSource, QLPersonDataSource } from "./graphql"
import { fetchToken, fetchTokenId } from "./system-buffer";

export default class DataServer extends Module {

    server!: ApolloServer;

    constructor(app: App) {
        super(app);
    }

    init(): Promise<void> {
        // const qlCollectionDataSource = new QLCollectionDataSource({
        //     connector: this.app.dbConn
        // });

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
                    dsCollection: new QLCollectionDataSource(this.app.dbConn),
                    dsSystem: new QLSystemDataSource(this.app.dbConn),
                    dsPerson: new QLPersonDataSource(this.app.dbConn)
                };
            },
            context: ({ request }) => {
                const headers: any = request.headers;
                if (headers && headers['authorization']) {
                    const token = headers['authorization'];
                    const id = fetchTokenId(token);

                    return {
                        id
                    };
                } else {
                    return {};
                }
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