const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require('apollo-server-core')
const { createServer } = require('http')
const { execute, subscribe } = require('graphql')
const { SubscriptionServer } = require('subscriptions-transport-ws')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const db = require('./data.js')
const { PubSub } = require('graphql-subscriptions')
const { typeDefs, resolvers } = require('./graphql/index.js')

const startServer = async () => {
  const app = express()

  const httpServer = createServer(app)

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  })

  const subscriptionServer = SubscriptionServer.create(
    { schema, execute, subscribe },
    { server: httpServer, path: '/graphql' }
  )

  const server = new ApolloServer({
    schema,
    plugins: [
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close()
            },
          }
        },
      },
      ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
    context: {
      db,
      pubSub: new PubSub(),
    },
  })

  await server.start()
  server.applyMiddleware({ app })

  const PORT = 4000
  httpServer.listen(PORT, () =>
    console.log(`Server is now running on http://localhost:${PORT}/graphql`)
  )
}

startServer()

exports.ben = 'Naber lan dümbük'
