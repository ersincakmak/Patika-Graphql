const path = require('path')
const { loadFilesSync } = require('@graphql-tools/load-files')
const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge')

const typesArray = loadFilesSync(path.join(__dirname, './**/*.graphql'))
const resolversArray = loadFilesSync(path.join(__dirname, './**/Resolver.js'))

const typeDefs = mergeTypeDefs(typesArray)
const resolvers = mergeResolvers(resolversArray)

module.exports = {
  typeDefs,
  resolvers,
}
