import React, { useContext } from 'react'
import GENDERS from '../../constants/gender'
import { FilterContext } from '../../contexts/FilterContext'
import RadioBtn from '../RadioBtn'

function GenderFilter() {
  const { gender, setGender } = useContext(FilterContext)

  return (
    <div className="filter">
      <h5 className="filter__name">Gender</h5>
      {GENDERS.map((item) => (
        <RadioBtn
          key={item.value}
          name="gender"
          checked={gender === item.value}
          onChange={(val) => setGender(val)}
          label={item.label}
          value={item.value}
        />
      ))}
    </div>
  )
}

export default GenderFilter
