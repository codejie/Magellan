import path from "path";
import { mergeResolvers, mergeTypeDefs } from "graphql-tools";
import { loadFilesSync } from "@graphql-tools/load-files";
import QLCollectionDataSource from "./ds/collection-datasource";
import QLSystemDataSource from "./ds/system-datasource";
import QLPersonDataSource from "./ds/person-datasource";

const typeDefs: any = mergeTypeDefs(loadFilesSync(path.join(__dirname, './schema'), { extensions:['graphql'] }));
const resolvers: any = mergeResolvers(loadFilesSync(path.join(__dirname, './resolver'), { ignoredExtensions: ['index.js'] }));

export {
    typeDefs,
    resolvers,
    QLCollectionDataSource,
    QLSystemDataSource,
    QLPersonDataSource
}
