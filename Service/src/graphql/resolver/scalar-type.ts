import { GraphQLScalarType } from 'graphql'
import { Header, Body, Result } from '../result'

function toDateString(date: Date): string {
    return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
}

function toTimeString(date: Date): string {
    return ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2) + ':'+ ('0' + date.getSeconds()).slice(-2);
}

function toDateTimeString(date: Date): string {
    return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2)
        + ' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2) + ':'+ ('0' + date.getSeconds()).slice(-2);
}

export default {
    Date: new GraphQLScalarType({
        name: 'Date',
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
    Time: new GraphQLScalarType({
        name: 'Time',
        serialize: (value) => toTimeString(value),
        parseValue: (value) => new Date(value),
        parseLiteral: (ast: any) => new Date(ast.value)
    })

    // Header: new GraphQLScalarType({
    //     name: 'Header',
    //     serialize: (value) => JSON.stringify(value),
    //     parseValue: (value) => (JSON.parse(value)) as Header,
    //     parseLiteral: (ast: any) => ast as Header
    // })
    // Body: new GraphQLScalarType({
    //     name: 'Body',
    //     serialize: (value) => JSON.stringify(value),
    //     parseValue: (value) => (JSON.parse(value)) as Body,
    //     parseLiteral: (ast: any) => ast as Body
    // })
    // Result: new GraphQLScalarType({
    //     name: 'Result',
    //     serialize: (value) => JSON.stringify(value),
    //     parseValue: (value) => (JSON.parse(value)) as Result,
    //     parseLiteral: (ast: any) => ast as Result
    // })    
}