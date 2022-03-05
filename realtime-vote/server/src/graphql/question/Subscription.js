const { withFilter } = require('graphql-subscriptions')

module.exports = {
  questionCreated: {
    subscribe: (_, __, { pubSub }) => pubSub.asyncIterator('questionCreated'),
  },
  questionVoted: {
    subscribe: withFilter(
      (_, __, { pubSub }) => pubSub.asyncIterator('questionVoted'),
      (payload, { questionId }) => {
        if (!questionId) return true
        return payload.questionVoted.id === questionId
      }
    ),
  },
}
