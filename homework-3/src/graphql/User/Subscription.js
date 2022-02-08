const { pubSub } = require('../../server')

module.exports = {
  userCreated: {
    subscribe: () => pubSub.asyncIterator('userCreated'),
  },
}
