const { createServer } = require('http')
const { execute, subscribe } = require('graphql')
const { SubscriptionServer } = require('subscriptions-transport-ws')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const { resolvers, typeDefs } = require('./graphql')
const dotenv = require('dotenv')
const pubSub = require('./pubSub')
const db = require('./db')

const startServer = async () => {
  const app = express()
  dotenv.config()

  const httpServer = createServer(app)

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  })

  const subscriptionServer = SubscriptionServer.create(
    { schema, execute, subscribe, onConnect: () => ({ pubSub: pubSub() }), db },
    { server: httpServer, path: '/graphql' }
  )

  const server = new ApolloServer({
    schema,
    context: { pubSub: pubSub(), db },
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
