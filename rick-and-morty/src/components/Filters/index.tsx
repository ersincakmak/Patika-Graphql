import React, { useContext } from 'react'
import { IoReloadOutline } from 'react-icons/io5'
import { FilterContext } from '../../contexts/FilterContext'
import Divider from '../Divider'
import GenderFilter from './GenderFilter'
import SpeciesFilter from './SpeciesFilter'
import LocationFilter from './LocationFilter'
import './style.scss'

function Filters() {
  const { clearFilters, gender, location, species } = useContext(FilterContext)

  return (
    <div className="filters">
      <div className="container-header">
        <h3 className="title">Filters</h3>
        <button
          className="right reset-btn"
          type="button"
          onClick={() => clearFilters()}
          disabled={!gender && !location && !species}
        >
          <IoReloadOutline />
          Clear Filters
        </button>
      </div>
      <GenderFilter />
      <Divider />
      <SpeciesFilter />
      <Divider />
      <LocationFilter />
    </div>
  )
}

export default Filters
