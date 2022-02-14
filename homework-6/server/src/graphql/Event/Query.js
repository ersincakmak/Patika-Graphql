module.exports = {
  events: (_parent, _args, { db }) => db.events,
  event: (_parent, { id }, { db }) =>
    db.events.find((event) => event.id === id),
}
