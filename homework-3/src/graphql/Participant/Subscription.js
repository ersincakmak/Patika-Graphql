const { pubSub } = require('../../server')

module.exports = {
  participantCreated: {
    subscribe: () => pubSub.asyncIterator('participantCreated'),
  },
}
