module.exports = {
  languages: (parent, _args, { db }) =>
    Object.entries(db.languages)
      .filter((item) => parent.languages.includes(item[0]))
      .map((item) => item[1]),

  continent: (parent, _args, { db }) => ({
    name: db.continents[parent.continent],
  }),
}
