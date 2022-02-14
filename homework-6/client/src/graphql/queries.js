import { gql } from '@apollo/client'
import { EVENT_LIST_FRAGMENT } from './fragments'

export const GET_EVENTS = gql`
  ${EVENT_LIST_FRAGMENT}
  query getEvents {
    events {
      ...EventListFragment
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
