const express = require('express')
const dotenv = require('dotenv')
const { createServer } = require('http')
const { execute, subscribe } = require('graphql')
const { SubscriptionServer } = require('subscriptions-transport-ws')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const { typeDefs, resolvers } = require('./graphql')
const { ApolloServer } = require('apollo-server-express')
const db = require('./db')
const { PubSub } = require('graphql-subscriptions')

dotenv.config()

const startServer = async () => {
  const app = express()
  const httpServer = createServer(app)
  const pubSub = new PubSub()

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  })

  const subscriptionServer = SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
      onConnect: () => ({
        pubSub,
      }),
    },
    {
      server: httpServer,
      path: '/graphql',
    }
  )

  const server = new ApolloServer({
    schema,
    context: {
      db,
      pubSub,
    },
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
    ],
  })
  await server.start()
  server.applyMiddleware({ app })

  const PORT = process.env.PORT || 4000

  httpServer.listen(PORT, () =>
    console.log(`Server is now running on http://localhost:${PORT}/graphql`)
  )
}

startServer()
