module.exports = {
  sendMessage: (_parent, { message }, { pubSub, db }) => {
    const createdMessage = {
      message,
      date: new Date().toString(),
    }
    pubSub.publish('messageCreated', {
      messageCreated: createdMessage,
    })
    db.messages.push(createdMessage)
    return createdMessage
  },
}
