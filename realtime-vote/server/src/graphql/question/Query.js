module.exports = {
  questions: (_parent, _args, { db }) => db.questions,
  question: (_parent, { id }, { db }) => {
    const question = db.questions.find((question) => question.id === id)
    if (!question) throw new Error('Question not found')
    return question
  },
}
