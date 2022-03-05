import { gql } from '@apollo/client'

export const questionVotedSubscription = gql`
  subscription questionVotedWithFilter($questionId: ID) {
    questionVoted(questionId: $questionId) {
      id
      title
      options {
        title
        voteCount
      }
    }
  }
`
