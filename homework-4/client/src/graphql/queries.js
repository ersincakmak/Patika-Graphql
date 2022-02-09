import { gql } from '@apollo/client'

export const GET_EVENTS = gql`
  query getEvents {
    events {
      id
      title
      desc
      date
    }
  }
`

export const GET_ONE_EVENT = gql`
  query getEvent($id: Int!) {
    event(id: $id) {
      id
      title
      desc
      date
      from
      to
      location {
        id
        name
        desc
        lat
        lng
      }
      participants {
        user {
          id
          username
          email
        }
      }
    }
  }
`
