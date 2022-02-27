import React from 'react'
import 'style/Reset.scss'
import 'style/App.scss'
import Header from 'components/Header'
import Filters from './components/Filters'

export default function App() {
  return (
    <>
      <Header />
      <div className="width-container page-container">
        <Filters />
        <div>Content</div>
      </div>
    </>
  )
}
