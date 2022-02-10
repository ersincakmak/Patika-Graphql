import { gql } from '@apollo/client'

export const EVENT_LIST_FRAGMENT = gql`
  fragment EventListFragment on Event {
    id
    title
    desc
    date
  }
`
