import { gql } from '@apollo/client'

export default gql`
  subscription {
    messageCreated {
      date
      message
    }
  }
`
