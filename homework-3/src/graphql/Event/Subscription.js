const { pubSub } = require('../variables')

module.exports = {
  eventCreated: {
    subscribe: () => {
      console.log('Çalışmış olması lazım')
      return pubSub.asyncIterator('eventCreated')
    },
  },
}
