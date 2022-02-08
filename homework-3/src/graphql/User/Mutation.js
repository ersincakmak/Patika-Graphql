const { pubSub } = require('../variables')

module.exports = {
  addUser: (_parent, { input: { username, email } }, { db }) => {
    const addedUser = {
      id: users.length + 1,
      username,
      email,
    }
    db.users.push(addedUser)
    pubSub.publish('userCreated', {
      userCreated: addedUser,
    })
    return addedUser
  },
  updateUser: (_parent, { input: { id, username, email } }, { db }) => {
    const index = db.users.findIndex((user) => user.id === id)
    if (index > -1) {
      db.users[index] = {
        ...db.users[index],
        email: email || db.users[index].email,
        username: username || db.users[index].username,
      }
      return db.users[index]
    }
    throw new Error('There is no user with this id.')
  },
  deleteUser: (_parent, { id }, { db }) => {
    const index = db.users.findIndex((user) => user.id === id)
    if (index > -1) {
      const deletedUser = db.users[index]
      db.users.splice(index, 1)
      return deletedUser
    }
    throw new Error('There is no user with this id.')
  },
  deleteAllUsers: (_parent, _args, { db }) => {
    const count = db.users.length
    db.users.splice(0, count)
    return `${count} user(s) found and deleted successfully.`
  },
}
