module.exports = {
  languages: (_parent, _args, { db }) => Object.values(db.languages),
  language: (_parent, { code }, { db }) => db.languages[code.toLowerCase()],
}
