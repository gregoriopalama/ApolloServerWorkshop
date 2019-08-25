import 'graphql-import-node'
import { makeExecutableSchema, IResolvers } from 'graphql-tools'
import { GraphQLSchema } from 'graphql'
import { mergeTypes } from 'merge-graphql-schemas'
import tempSchema from './api/schema.graphql'

const typeDefs = mergeTypes([
    tempSchema
])

const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers: {
      Query: {
        helloWorld(_: void, args: void): string {
            return `👋 Hello world! 👋`;
        },
      },
    }
})
export default schema