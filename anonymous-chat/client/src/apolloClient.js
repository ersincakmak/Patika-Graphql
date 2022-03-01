import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client'
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'

const wsLink = new WebSocketLink({
  uri: process.env.REACT_APP_GRAPHQL_SUBSCRIPTION_ENDPOINT,
  options: {
    reconnect: true,
  },
})

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
})

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  httpLink
)

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
})

export default client
