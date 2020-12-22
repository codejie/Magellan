import path from "path";
import { mergeResolvers, mergeTypeDefs } from "graphql-tools";
import { loadFilesSync } from "@graphql-tools/load-files";
import QLDataSource from "./ql-datasource";

const typeDefs: any = mergeTypeDefs(loadFilesSync(path.join(__dirname, './schema'), { extensions:['graphql'] }));
const resolvers: any = mergeResolvers(loadFilesSync(path.join(__dirname, './resolver'), { ignoredExtensions: ['index.js'] }));

export {
    typeDefs,
    resolvers,
    QLDataSource
}
