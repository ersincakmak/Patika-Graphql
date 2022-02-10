const pubSub = require('../pubSub')
module.exports = {
  eventCreated: {
    subscribe: () => {
      return pubSub.asyncIterator('eventCreated')
    },
  },
}
