module.exports = {
  user: (parent, _args, { db }) =>
    db.users.find((user) => user.id === parent.user_id),
  location: (parent, _args, { db }) =>
    db.locations.find((location) => location.id === parent.location_id),
  participants: (parent, _args, { db }) =>
    db.participants.filter((participant) => participant.event_id == parent.id),
}
