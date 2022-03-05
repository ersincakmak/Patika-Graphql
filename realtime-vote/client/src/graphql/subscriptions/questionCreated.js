import { gql } from '@apollo/client'

export const questionCreatedSubscription = gql`
  subscription questionCreated {
    questionCreated {
      id
      title
      options {
        title
        voteCount
      }
    }
  }
`
