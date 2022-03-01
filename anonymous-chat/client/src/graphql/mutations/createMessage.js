import { gql } from '@apollo/client'

export default gql`
  mutation ($message: String!) {
    sendMessage(message: $message) {
      date
      message
    }
  }
`
