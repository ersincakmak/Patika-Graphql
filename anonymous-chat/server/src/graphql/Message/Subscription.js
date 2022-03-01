module.exports = {
  messageCreated: {
    subscribe: (_, __, { pubSub }) => pubSub.asyncIterator('messageCreated'),
  },
}
