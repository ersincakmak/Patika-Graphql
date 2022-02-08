const path = require('path')
const { loadFilesSync } = require('@graphql-tools/load-files')
const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge')
const { PubSub } = require('graphql-subscriptions')

const typesArray = loadFilesSync(path.join(__dirname, './**/*.graphql'))
const resolversArray = loadFilesSync(path.join(__dirname, './**/Resolver.js'))

const typeDefs = mergeTypeDefs(typesArray)
const resolvers = mergeResolvers(resolversArray)

const pubSub = new PubSub()

module.exports = {
  typeDefs,
  resolvers,
  pubSub,
}
