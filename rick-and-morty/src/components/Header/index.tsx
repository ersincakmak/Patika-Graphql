import React, { useContext, useEffect, useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import { FaTimes } from 'react-icons/fa'
import { FilterContext } from '../../contexts/FilterContext'
import './style.scss'

function Header() {
  const [searchText, setSearchText] = useState('')

  const { setName } = useContext(FilterContext)

  const resetSearch = () => {
    setSearchText('')
    setName('')
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setName(searchText)
    }, 500)

    return () => clearTimeout(timer)
  }, [searchText])

  return (
    <header>
      <p className="title">Wubba Lubba Dub Dub.</p>
      <div className="inputContainer">
        <BiSearch className="icon" />
        <input
          type="text"
          value={searchText}
          onInput={(e) => setSearchText(e.currentTarget.value)}
          placeholder="Search"
        />
        {searchText.length > 0 && (
          <button
            type="button"
            className="inputContainer__reset"
            onClick={resetSearch}
          >
            <FaTimes />
          </button>
        )}
      </div>
    </header>
  )
}

export default Header
