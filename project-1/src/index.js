const { ApolloServer } = require('apollo-server')
const { resolvers, typeDefs } = require('./graphql')
const { continents, countries, languages } = require('./data')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: (req, res) => ({
    req,
    res,
    db: {
      continents,
      countries,
      languages,
    },
  }),
})

server.listen(4000).then(({ port }) => {
  console.log('Server is running on ' + port)
})
