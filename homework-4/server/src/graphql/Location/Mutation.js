module.exports = {
  addLocation: (_parent, { input: { name, desc, lat, lng } }, { db }) => {
    const addedLocation = {
      id: db.locations.length + 1,
      name,
      desc,
      lat,
      lng,
    }
    db.locations.push(addedLocation)
    return addedLocation
  },
  updateLocation: (_parent, { input: { id, name, desc, lat, lng } }) => {
    const index = db.locations.findIndex((location) => location.id === id)
    if (index > -1) {
      db.locations[index] = {
        ...db.locations[index],
        name: name || db.locations[index].name,
        desc: desc || db.locations[index].desc,
        lat: lat || db.locations[index].lat,
        lng: lng || db.locations[index].lng,
      }
      return db.locations[index]
    }
    throw new Error('There is no location with this id.')
  },
  deleteLocation: (_parent, { id }, { db }) => {
    const index = db.locations.findIndex((location) => location.id === id)
    if (index > -1) {
      const deletedLocation = db.locations[index]
      db.locations.splice(index, 1)
      return deletedLocation
    }
    throw new Error('There is no location with this id.')
  },
  deleteAllLocations: () => {
    const count = db.locations.length
    db.locations.splice(0, count)
    return `${count} location(s) found and deleted successfully.`
  },
}
