import { gql } from '@apollo/client'

export const voteMutation = gql`
  mutation vote($input: VoteInput) {
    vote(input: $input) {
      id
      title
      options {
        title
        voteCount
      }
    }
  }
`
