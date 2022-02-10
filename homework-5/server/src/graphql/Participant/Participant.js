module.exports = {
  user: (parent, _args, { db }) => {
    return db.users.find((user) => user.id === parent.user_id)
  },
  event: (parent, _args, { db }) =>
    db.events.find((event) => event.id === parent.event_id),
}
