import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import { createServer } from 'http'
import { execute, subscribe } from 'graphql'
import { SubscriptionServer } from 'subscriptions-transport-ws'
import { makeExecutableSchema } from '@graphql-tools/schema'
import express from 'express'
import { ApolloServer, gql } from 'apollo-server-express'
import { events, locations, participants, users } from './data.js'
import { PubSub } from 'graphql-subscriptions'

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

  input AddUserInput {
    username: String!
    email: String!
  }

  input UpdateUserInput {
    id: Int!
    username: String
    email: String
  }

  input AddEventInput {
    title: String!
    desc: String!
    date: String!
    from: String!
    to: String!
    location_id: Int!
    user_id: Int!
  }

  input UpdateEventInput {
    id: Int!
    title: String
    desc: String
    date: String
    from: String
    to: String
    location_id: Int
  }

  input AddLocationInput {
    name: String!
    desc: String!
    lat: Float!
    lng: Float!
  }

  input UpdateLocationInput {
    id: Int!
    name: String
    desc: String
    lat: Float
    lng: Float
  }

  input AddParticipantInput {
    user_id: Int!
    event_id: Int!
  }

  input UpdateParticipantInput {
    id: Int!
    user_id: Int
    event_id: Int
  }

  type Mutation {
    # User
    addUser(input: AddUserInput!): User!
    updateUser(input: UpdateUserInput!): User
    deleteUser(id: Int!): User
    deleteAllUsers: String

    #Event
    addEvent(input: AddEventInput!): Event!
    updateEvent(input: UpdateEventInput!): Event
    deleteEvent(id: Int!): Event
    deleteAllEvents: String

    #Location
    addLocation(input: AddLocationInput!): Location!
    updateLocation(input: UpdateLocationInput!): Location
    deleteLocation(id: Int!): Location
    deleteAllLocations: String

    #Participant
    addParticipant(input: AddParticipantInput!): Participant!
    updateParticipant(input: UpdateParticipantInput!): Participant
    deleteParticipant(id: Int!): Participant
    deleteAllParticipants: String
  }

  type Subscription {
    userCreated: User
    eventCreated: Event
    participantCreated: Participant
  }
`

const resolvers = {
  Subscription: {
    userCreated: {
      subscribe: () => pubSub.asyncIterator('userCreated'),
    },
    eventCreated: {
      subscribe: () => pubSub.asyncIterator('eventCreated'),
    },
    participantCreated: {
      subscribe: () => pubSub.asyncIterator('participantCreated'),
    },
  },
  Mutation: {
    // User
    addUser: (parent, { input: { username, email } }) => {
      const addedUser = {
        id: users.length + 1,
        username,
        email,
      }
      users.push(addedUser)
      pubSub.publish('userCreated', {
        userCreated: addedUser,
      })
      return addedUser
    },
    updateUser: (parent, { input: { id, username, email } }) => {
      const index = users.findIndex((user) => user.id === id)
      if (index > -1) {
        users[index] = {
          ...users[index],
          email: email || users[index].email,
          username: username || users[index].username,
        }
        return users[index]
      }
      throw new Error('There is no user with this id.')
    },
    deleteUser: (parent, { id }) => {
      const index = users.findIndex((user) => user.id === id)
      if (index > -1) {
        const deletedUser = users[index]
        users.splice(index, 1)
        return deletedUser
      }
      throw new Error('There is no user with this id.')
    },
    deleteAllUsers: () => {
      const count = users.length
      users.splice(0, count)
      return `${count} user(s) found and deleted successfully.`
    },

    // Event
    addEvent: (parent, { input: { title, desc, date, from, to, location_id, user_id } }) => {
      const userIndex = users.findIndex((user) => user.id === user_id)
      const locationIndex = locations.findIndex((location) => location.id === location_id)
      if (userIndex < 0) {
        throw new Error('There is no user with this user_id.')
      } else if (locationIndex < 0) {
        throw new Error('There is no location with this event_id.')
      } else {
        const addedEvent = {
          id: events.length + 1,
          title,
          desc,
          date,
          from,
          to,
          location_id,
          user_id,
        }
        events.push(addedEvent)
        pubSub.publish('eventCreated', {
          eventCreated: addedEvent,
        })
        return addedEvent
      }
    },
    updateEvent: (parent, { input: { id, title, desc, date, from, to, location_id } }) => {
      const index = events.findIndex((item) => item.id === id)
      const locationIndex = locations.findIndex((location) => location.id === location_id)
      if (locationIndex < 0) {
        throw new Error('There is no location with this event_id.')
      } else if (index < 0) {
        throw new Error('There is no event with this id.')
      } else {
        events[index] = {
          ...events[index],
          title: title || events[index].title,
          desc: desc || events[index].desc,
          date: date || events[index].date,
          from: from || events[index].from,
          to: to || events[index].to,
          location_id: location_id || events[index].location_id,
        }
        return events[index]
      }
    },
    deleteEvent: (parent, { id }) => {
      const index = events.findIndex((item) => item.id === id)
      if (index > -1) {
        const deletedEvent = events[index]
        events.splice(index, 1)
        return deletedEvent
      }
      throw new Error('There is no event with this id.')
    },
    deleteAllEvents: () => {
      const count = events.length
      events.splice(0, count)
      return `${count} event(s) found and deleted successfully.`
    },

    // Location
    addLocation: (parent, { input: { name, desc, lat, lng } }) => {
      const addedLocation = {
        id: locations.length + 1,
        name,
        desc,
        lat,
        lng,
      }
      locations.push(addedLocation)
      return addedLocation
    },
    updateLocation: (parent, { input: { id, name, desc, lat, lng } }) => {
      const index = locations.findIndex((location) => location.id === id)
      if (index > -1) {
        locations[index] = {
          ...locations[index],
          name: name || locations[index].name,
          desc: desc || locations[index].desc,
          lat: lat || locations[index].lat,
          lng: lng || locations[index].lng,
        }
        return locations[index]
      }
      throw new Error('There is no location with this id.')
    },
    deleteLocation: (parent, { id }) => {
      const index = locations.findIndex((location) => location.id === id)
      if (index > -1) {
        const deletedLocation = locations[index]
        locations.splice(index, 1)
        return deletedLocation
      }
      throw new Error('There is no location with this id.')
    },
    deleteAllLocations: () => {
      const count = locations.length
      locations.splice(0, count)
      return `${count} location(s) found and deleted successfully.`
    },

    // Participant
    addParticipant: (parent, { input: { user_id, event_id } }) => {
      const userIndex = users.findIndex((user) => user.id === user_id)
      const eventIndex = events.findIndex((event) => event.id === event_id)
      if (userIndex < 0) {
        throw new Error('There is no user with this user_id.')
      } else if (eventIndex < 0) {
        throw new Error('There is no event with this event_id.')
      } else {
        const addedParticipant = {
          id: participants.length + 1,
          user_id,
          event_id,
        }
        participants.push(addedParticipant)
        pubSub.publish('participantCreated', {
          participantCreated: addedParticipant,
        })
        return addedParticipant
      }
    },
    updateParticipant: (parent, { input: { id, user_id, event_id } }) => {
      const index = participants.findIndex((participant) => participant.id === id)
      const userIndex = users.findIndex((user) => user.id === user_id)
      const eventIndex = events.findIndex((event) => event.id === event_id)
      if (userIndex < 0) {
        throw new Error('There is no user with this user_id.')
      } else if (eventIndex < 0) {
        throw new Error('There is no event with this event_id.')
      } else if (index < 0) {
        throw new Error('There is no participant with this id.')
      } else {
        participants[index] = {
          ...participants[index],
          user_id: user_id || participants[index].user_id,
          event_id: event_id || participants[index].event_id,
        }
        return participants[index]
      }
    },
    deleteParticipant: (parent, { id }) => {
      const index = participants.findIndex((participant) => participant.id === id)
      if (index > -1) {
        const deletedParticipant = participants[index]
        participants.splice(index, 1)
        return deletedParticipant
      }
      throw new Error('There is no participant with this id.')
    },
    deleteAllParticipants: () => {
      const count = participants.length
      participants.splice(0, count)
      return `${count} participant(s) found and deleted successfully.`
    },
  },
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
export const pubSub = new PubSub()

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
      pubSub,
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
