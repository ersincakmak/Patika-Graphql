import { gql } from '@apollo/client'

export const getOneQuestionQuery = gql`
  query ($questionId: ID!) {
    question(id: $questionId) {
      id
      title
      options {
        title
        voteCount
      }
    }
  }
`
