const { pubSub } = require('../variables')

module.exports = {
  userCreated: {
    subscribe: () => pubSub.asyncIterator('userCreated'),
  },
}
