import { gql } from '@apollo/client'

export default gql`
  query {
    messages {
      date
      message
    }
  }
`
