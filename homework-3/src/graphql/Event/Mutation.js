module.exports = {
  addEvent: (
    _parent,
    { input: { title, desc, date, from, to, location_id, user_id } },
    { db, pubSub }
  ) => {
    const userIndex = db.users.findIndex((user) => user.id === user_id)
    const locationIndex = db.locations.findIndex(
      (location) => location.id === location_id
    )
    if (userIndex < 0) {
      throw new Error('There is no user with this user_id.')
    } else if (locationIndex < 0) {
      throw new Error('There is no location with this event_id.')
    } else {
      const addedEvent = {
        id: events.length + 1,
        title,
        desc,
        date,
        from,
        to,
        location_id,
        user_id,
      }
      db.events.push(addedEvent)
      pubSub.publish('eventCreated', {
        eventCreated: addedEvent,
      })
      return addedEvent
    }
  },
  updateEvent: (
    _parent,
    { input: { id, title, desc, date, from, to, location_id } },
    { db }
  ) => {
    const index = db.events.findIndex((item) => item.id === id)
    const locationIndex = db.locations.findIndex(
      (location) => location.id === location_id
    )
    if (locationIndex < 0) {
      throw new Error('There is no location with this event_id.')
    } else if (index < 0) {
      throw new Error('There is no event with this id.')
    } else {
      db.events[index] = {
        ...db.events[index],
        title: title || db.events[index].title,
        desc: desc || db.events[index].desc,
        date: date || db.events[index].date,
        from: from || db.events[index].from,
        to: to || db.events[index].to,
        location_id: location_id || db.events[index].location_id,
      }
      return db.events[index]
    }
  },
  deleteEvent: (_parent, { id }, { db }) => {
    const index = db.events.findIndex((item) => item.id === id)
    if (index > -1) {
      const deletedEvent = db.events[index]
      db.events.splice(index, 1)
      return deletedEvent
    }
    throw new Error('There is no event with this id.')
  },
  deleteAllEvents: (_parent, _args, { db }) => {
    const count = db.events.length
    db.events.splice(0, count)
    return `${count} event(s) found and deleted successfully.`
  },
}
