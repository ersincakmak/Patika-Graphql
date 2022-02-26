import React, { createContext, useMemo, useState } from 'react'
import { IFilterContext } from '../types/filterContext'

export const FilterContext = createContext<IFilterContext>({
  gender: null,
  location: null,
  species: null,
  setGender: () => {},
  setSpecies: () => {},
  setLocation: () => {},
  clearFilters: () => {},
})

export function FilterContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [gender, setGender] = useState<string | null>(null)
  const [species, setSpecies] = useState<string | null>(null)
  const [location, setLocation] = useState<string | null>(null)

  const setGenderHandler = (val: string | null) => setGender(val)

  const setLocationHandler = (val: string | null) => setLocation(val)

  const setSpeciesHandler = (val: string | null) => setSpecies(val)

  const clearFilters = () => {
    setGender(null)
    setLocation(null)
    setSpecies(null)
  }

  const value = useMemo(
    () => ({
      gender,
      location,
      species,
      setGender: setGenderHandler,
      setLocation: setLocationHandler,
      setSpecies: setSpeciesHandler,
      clearFilters,
    }),
    [gender, species, location]
  )

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  )
}
