import { ApolloServer, gql } from "apollo-server-fastify";
import fastify from "fastify";
import { App } from "./app";
import logger from "./logger";
import Module from "./module";


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

        const typeDefs = gql`
            type Query {
                "A simple type for getting started!"
                hello: String
            }
        `;

        // A map of functions which return data for the schema.
        const resolvers = {
            Query: {
                hello: () => 'world',
            },
        };
        this.server = new ApolloServer({
            typeDefs,
            resolvers,
            logger: logger
        });

        return super.init();
    }

    start(): Promise<void> {

        const app = fastify();
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