const pubSub = require('../pubSub')
module.exports = {
  userCreated: {
    subscribe: () => pubSub.asyncIterator('userCreated'),
  },
}
