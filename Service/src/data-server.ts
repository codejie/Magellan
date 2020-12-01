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
        // load typedefs and resolvers

        // const typeDefs: any = gql`
        //     type Book {
        //         title: String
        //     }
        // `;

        // const resolvers: any = {
        //     Query: {
        //         books:() => { title: 'bookkkk'}
        //     }
        // }

        // const typeDefs = gql`
        //     type Book {
        //         name: String
        //     }

        //     type Query {
        //         "A simple type for getting started!"
        //         hello: String,
        //         book: Book
        //     }

        //     extend type Query {
        //         b(id: String): Book
        //     }
        // `;

        // // A map of functions which return data for the schema.
        // const resolvers = {
        //     Query: {
        //         hello: () => 'world',
        //         book: () => {
        //             return {
        //                 name:'book'
        //             }
        //         },
        //         b: (parent: any, args: any, context: any, info: any) => {
        //             logger.debug('id=' + args.id);
        //             return {
        //                 name: args.id
        //             };
        //         } 
        //     }
        // };

        // const typeDefs = mergeTypeDefs(loadFilesSync(path.join(__dirname, './gl/schema'), { extensions:['graphql']}));
        // const resolvers = mergeResolvers(loadFilesSync(path.join(__dirname, './gl/resolver')));

        const qlDataSource = new QLDataSource({
            connector: this.app.dbConn
        });

        this.server = new ApolloServer({
            typeDefs,
            resolvers,
            logger: logger,
            subscriptions: '/subscriptions',
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