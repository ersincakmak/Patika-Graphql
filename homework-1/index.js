const { ApolloServer, gql } = require('apollo-server')
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core')
const { events, locations, participants, users } = require('./data')

const typeDefs = gql`
  type Location {
    id: Int!
    name: String!
    desc: String!
    lat: Float!
    lng: Float!
  }

  type User {
    id: Int!
    username: String!
    email: String!
  }

  type Participant {
    id: Int!
    user_id: Int!
    event_id: Int!
    event: Event!
    user: User!
  }

  type Event {
    id: Int!
    title: String!
    desc: String!
    date: String!
    from: String!
    to: String!
    location_id: Int!
    user_id: Int!
    user: User!
    location: Location!
    participants: [Participant!]
  }

  type Query {
    events: [Event!]
    event(id: Int!): Event

    locations: [Location!]
    location(id: Int!): Location

    users: [User!]
    user(id: Int!): User

    participants: [Participant!]
    participant(id: Int!): Participant
  }
`

const resolvers = {
  Query: {
    events: () => events,
    event: (parent, { id }) => events.find((event) => event.id === id),

    locations: () => locations,
    location: (parent, { id }) => locations.find((location) => location.id === id),

    users: () => users,
    user: (parent, { id }) => users.find((user) => user.id === id),

    participants: () => participants,
    participant: (parent, { id }) => participants.find((participant) => participant.id === id),
  },
  Event: {
    user: (parent) => users.find((user) => user.id === parent.user_id),
    location: (parent) => locations.find((location) => location.id === parent.location_id),
    participants: (parent) =>
      participants.filter((participant) => participant.event_id !== parent.id),
  },
  Participant: {
    user: (parent) => users.find((user) => user.id === parent.user_id),
    event: (parent) => events.find((event) => event.id === parent.event_id),
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
})

server.listen().then(({ url }) => {
  console.log(`Server running on ${url}`)
})
