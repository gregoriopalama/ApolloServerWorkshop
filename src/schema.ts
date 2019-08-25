import 'graphql-import-node'
import { makeExecutableSchema, IResolvers } from 'graphql-tools'
import { GraphQLSchema } from 'graphql'
import { mergeTypes } from "merge-graphql-schemas"

import categorySchema from './api/category/schema.graphql'
import recipeSchema from './api/recipe/schema.graphql'

import categoryResolvers from './api/category/resolvers'
import recipeResolvers from './api/recipe/resolvers'


const typeDefs = mergeTypes([
    categorySchema,
    recipeSchema
])

const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers: {
    Query: {
        ...categoryResolvers.Query,
        ...recipeResolvers.Query,
    },
    Mutation: {
        ...categoryResolvers.Mutation,
        ...recipeResolvers.Mutation
    },
    Recipe: recipeResolvers.Recipe,
    Category: categoryResolvers.Category,
},
})
export default schema