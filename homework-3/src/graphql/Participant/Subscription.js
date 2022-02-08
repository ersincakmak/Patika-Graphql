const { pubSub } = require('../variables')

module.exports = {
  participantCreated: {
    subscribe: () => pubSub.asyncIterator('participantCreated'),
  },
}
