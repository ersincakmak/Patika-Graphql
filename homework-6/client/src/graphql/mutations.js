import { gql } from '@apollo/client'

export const ADD_EVENT_MUTATION = gql`
  mutation addEventMutation($input: AddEventInput!) {
    addEvent(input: $input) {
      title
    }
  }
`
