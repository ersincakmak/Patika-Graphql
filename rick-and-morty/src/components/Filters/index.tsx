import React, { useContext, useMemo } from 'react'
import { FiFilter } from 'react-icons/fi'
import { IoReloadOutline } from 'react-icons/io5'
import { FilterContext } from '../../contexts/FilterContext'
import Divider from '../Divider'
import GenderFilter from './GenderFilter'
import LocationFilter from './LocationFilter'
import SpeciesFilter from './SpeciesFilter'
import './style.scss'

function Filters() {
  const { clearFilters, gender, location, species } = useContext(FilterContext)

  const body = useMemo(() => document.body, [])

  const showResults = () => {
    body.classList.remove('filters-active')
  }

  const showFilters = () => {
    body.classList.add('filters-active')
  }

  const resetFilters = () => {
    clearFilters()
    body.classList.remove('filters-active')
  }

  return (
    <div className="filters">
      <div className="filters__inner">
        <div className="container-header">
          <h3 className="title">Filters</h3>
          <button
            className="right reset-btn"
            type="button"
            onClick={clearFilters}
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
      <div className="filters__buttons">
        <button
          type="button"
          className="filter__button filter__button--reset"
          onClick={resetFilters}
        >
          Reset Filters
        </button>
        <button
          type="button"
          className="filter__button filter__button--result"
          onClick={showResults}
        >
          Show Results
        </button>
      </div>
      <div className="filters__show">
        <button
          type="button"
          className="filter__button filter__button--show"
          onClick={showFilters}
        >
          <FiFilter /> Filters
        </button>
      </div>
    </div>
  )
}

export default Filters
