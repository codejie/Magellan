import { GraphQLScalarType } from 'graphql'

function toDateString(date: Date): string {
    return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
}

function toDateTimeString(date: Date): string {
    return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2)
        + ' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2) + ':'+ ('0' + date.getSeconds()).slice(-2);
}

export default {
    Date: new GraphQLScalarType({
        name: 'DateTime',
        serialize: (value) => toDateString(value),
        parseValue: (value) => new Date(value),
        parseLiteral: (ast: any) => new Date(ast.value)
    }),
    DateTime: new GraphQLScalarType({
        name: 'DateTime',
        serialize: (value) => toDateTimeString(value),
        parseValue: (value) => new Date(value),
        parseLiteral: (ast: any) => new Date(ast.value)
    }),    
}