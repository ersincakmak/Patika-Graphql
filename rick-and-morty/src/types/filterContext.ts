export interface IFilterContext {
  gender: string | null
  species: string | null
  location: string | null
  name: string | null
  setGender: (val: string | null) => void
  setSpecies: (val: string | null) => void
  setLocation: (val: string | null) => void
  setName: (val: string | null) => void
  clearFilters: () => void
}
