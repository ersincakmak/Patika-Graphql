module.exports = {
  users: (_parent, _args, { db }) => db.users,
  user: (_parent, { id }, { db }) => db.users.find((user) => user.id === id),
}
