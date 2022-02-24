module.exports = {
  countries: (_parent, _args, { db }) => Object.values(db.countries),
  country: (_parent, { code }, { db }) => db.countries[code],
}
