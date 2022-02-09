const pubSub = require('../pubSub')
module.exports = {
  addParticipant: (_parent, { input: { user_id, event_id } }, { db }) => {
    const userIndex = db.users.findIndex((user) => user.id === user_id)
    const eventIndex = db.events.findIndex((event) => event.id === event_id)
    if (userIndex < 0) {
      throw new Error('There is no user with this user_id.')
    } else if (eventIndex < 0) {
      throw new Error('There is no event with this event_id.')
    } else {
      const addedParticipant = {
        id: db.participants.length + 1,
        user_id,
        event_id,
      }
      pubSub.publish('participantCreated', {
        participantCreated: addedParticipant,
      })
      db.participants.push(addedParticipant)
      return addedParticipant
    }
  },
  updateParticipant: (
    _parent,
    { input: { id, user_id, event_id } },
    { db }
  ) => {
    const index = db.participants.findIndex(
      (participant) => participant.id === id
    )
    const userIndex = db.users.findIndex((user) => user.id === user_id)
    const eventIndex = db.events.findIndex((event) => event.id === event_id)
    if (userIndex < 0) {
      throw new Error('There is no user with this user_id.')
    } else if (eventIndex < 0) {
      throw new Error('There is no event with this event_id.')
    } else if (index < 0) {
      throw new Error('There is no participant with this id.')
    } else {
      db.participants[index] = {
        ...db.participants[index],
        user_id: user_id || db.participants[index].user_id,
        event_id: event_id || db.participants[index].event_id,
      }
      return db.participants[index]
    }
  },
  deleteParticipant: (_parent, { id }, { db }) => {
    const index = db.participants.findIndex(
      (participant) => participant.id === id
    )
    if (index > -1) {
      const deletedParticipant = db.participants[index]
      db.participants.splice(index, 1)
      return deletedParticipant
    }
    throw new Error('There is no participant with this id.')
  },
  deleteAllParticipants: (_parent, _args, { db }) => {
    const count = db.participants.length
    db.participants.splice(0, count)
    return `${count} participant(s) found and deleted successfully.`
  },
}
