import React from 'react'
import 'style/Reset.scss'
import 'style/App.scss'
import Header from 'components/Header'
import Filters from './components/Filters'
import { FilterContextProvider } from './contexts/FilterContext'

export default function App() {
  return (
    <FilterContextProvider>
      <Header />
      <div className="width-container page-container">
        <Filters />
        <div>Content</div>
      </div>
    </FilterContextProvider>
  )
}
