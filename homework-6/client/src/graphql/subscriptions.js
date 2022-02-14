import { gql } from '@apollo/client'
import { EVENT_LIST_FRAGMENT } from './fragments'

export const EVENT_CREATE_SUBSCRIPTION = gql`
  ${EVENT_LIST_FRAGMENT}
  subscription {
    eventCreated {
      ...EventListFragment
    }
  }
`

export const PARTICIPANT_ADD_SUBSCRIPTION = gql`
  subscription {
    participantCreated {
      user {
        id
        username
        email
      }
    }
  }
`
