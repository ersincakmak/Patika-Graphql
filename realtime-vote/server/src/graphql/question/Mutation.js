const { v4 } = require('uuid')

module.exports = {
  createQuestion: (_parent, { input }, { db, pubSub }) => {
    const { title, options } = input

    if (options.length < 2) {
      throw new Error('You must provide at least two options')
    }

    const createdOptions = options.map((optionText) => ({
      voteCount: 0,
      title: optionText,
    }))

    const question = {
      id: v4(),
      title,
      options: createdOptions,
    }

    db.questions.push(question)

    pubSub.publish('questionCreated', {
      questionCreated: question,
    })

    return question
  },

  vote(_parent, { input }, { db, pubSub }) {
    const { questionId, optionTitle } = input

    const question = db.questions.find((question) => question.id === questionId)

    if (!question) {
      throw new Error('Question not found')
    }

    const option = question.options.find(
      (option) => option.title === optionTitle
    )

    if (!option) {
      throw new Error('Option not found')
    }

    question.options = question.options.map((option) =>
      option.title === optionTitle
        ? {
            ...option,
            voteCount: option.voteCount + 1,
          }
        : option
    )

    pubSub.publish('questionVoted', {
      questionVoted: question,
    })

    return question
  },
}
