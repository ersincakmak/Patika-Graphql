const pubSub = require('../pubSub')

module.exports = {
  participantCreated: {
    subscribe: () => pubSub.asyncIterator('participantCreated'),
  },
}
