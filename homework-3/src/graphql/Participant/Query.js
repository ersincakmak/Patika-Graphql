module.exports = {
  participants: (_parent, _args, { db }) => db.participants,
  participant: (_parent, { id }, { db }) =>
    db.participants.find((participant) => participant.id === id),
}
