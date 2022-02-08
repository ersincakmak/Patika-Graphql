const ctx = require('../index')
console.log('Amunakoyarım', ctx)

module.exports = {
  eventCreated: {
    subscribe: () => pubSub.asyncIterator('eventCreated'),
  },
}
