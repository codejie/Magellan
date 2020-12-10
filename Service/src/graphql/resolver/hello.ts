// import { GraphQLScalarType } from 'graphql'

export default {
    // DateTime: new GraphQLScalarType({
    //     name: 'DateTime',
    //     serialize: (value) => value.toString(),
    //     parseValue: (value) => new Date(value),
    //     parseLiteral: (ast: any) => new Date(ast.value)
    // }),    

    Query: {
        hello: () => 'HELLO',
        time: () => new Date()
    }
}