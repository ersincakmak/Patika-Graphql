import { gql } from '@apollo/client'

export const createQuestionMutation = gql`
  mutation createQuestion($input: CreateQuestionInput) {
    createQuestion(input: $input) {
      id
      title
      options {
        title
        voteCount
      }
    }
  }
`
