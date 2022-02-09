module.exports = {
  locations: (_parent, _args, { db }) => db.locations,
  location: (_parent, { id }, { db }) =>
    db.locations.find((location) => location.id === id),
}
