import React, { useContext } from 'react'
import SPECIES from '../../constants/species'
import { FilterContext } from '../../contexts/FilterContext'
import RadioBtn from '../RadioBtn'

function SpeciesFilter() {
  const { species, setSpecies } = useContext(FilterContext)

  return (
    <div className="filter">
      <h5 className="filter__name">Species</h5>
      {SPECIES.map((item) => (
        <RadioBtn
          key={item.value}
          name="species"
          checked={species === item.value}
          label={item.label}
          value={item.value}
          onChange={(val) => setSpecies(val)}
        />
      ))}
    </div>
  )
}

export default SpeciesFilter
