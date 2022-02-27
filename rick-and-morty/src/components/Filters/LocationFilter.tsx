import React, { useContext, useMemo, useState } from 'react'
import { FilterContext } from '../../contexts/FilterContext'
import { useGetAllLocationsQuery } from '../../generated/graphql'
import RadioBtn from '../RadioBtn'
import Search from '../Search'
import Spinner from '../Spinner'

function LocationFilter() {
  const { location, setLocation } = useContext(FilterContext)
  const { data, loading, called } = useGetAllLocationsQuery()
  const [searchText, setSearchText] = useState('')

  const filteredLocations = useMemo(() => {
    if (data?.locations?.results) {
      return [
        ...data.locations.results.filter((item) =>
          item?.name
            ?.toLocaleLowerCase()
            .includes(searchText.toLocaleLowerCase())
        ),
      ]
    }
    return []
  }, [data, searchText])

  return (
    <div className="filter">
      <h5 className="filter__name">Locations</h5>
      <Search
        placeholder="Search for locations"
        onSearch={setSearchText}
        timeOut={0}
      />
      {loading && !called ? (
        <Spinner />
      ) : (
        filteredLocations.length > 0 &&
        filteredLocations
          .slice(0, 10)
          .map((item) => (
            <RadioBtn
              key={item?.name as string}
              name="location"
              label={item?.name as string}
              value={item?.name as string}
              onChange={(val) => setLocation(val)}
              checked={location === (item?.name as string)}
            />
          ))
      )}
      {!loading && called && filteredLocations.length < 1 && (
        <p>No results found</p>
      )}
    </div>
  )
}

export default LocationFilter
