import { gql } from '@apollo/client'

export const getAllQuestionsQuery = gql`
  query getAllQuestions {
    questions {
      id
      title
      options {
        title
        voteCount
      }
    }
  }
`
