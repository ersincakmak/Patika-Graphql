module.exports = {
  continents: (_parent, _args, { db }) =>
    Object.values(db.continents).map((item) => ({ name: item })),
  continent: (_parent, { code }, { db }) => ({ name: db.continents[code] }),
}
