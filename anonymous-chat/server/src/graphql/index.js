const path = require('path')
const { loadFilesSync } = require('@graphql-tools/load-files')
const { mergeResolvers, mergeTypeDefs } = require('@graphql-tools/merge')

const resolverFiles = loadFilesSync(path.join(__dirname, './**/Resolver.js'))
const resolvers = mergeResolvers(resolverFiles)

const typeDefFiles = loadFilesSync(path.join(__dirname, './**/*.graphql'))
const typeDefs = mergeTypeDefs(typeDefFiles)

module.exports = {
  resolvers,
  typeDefs,
}
