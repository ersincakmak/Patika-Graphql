import React, { useEffect, useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import { FaTimes } from 'react-icons/fa'
import './style.scss'

interface Props {
  onSearch: (value: string) => void
  placeholder?: string
  timeOut?: number
}

function Search({ onSearch, placeholder, timeOut }: Props) {
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchText)
    }, timeOut)

    return () => clearTimeout(timer)
  }, [searchText, onSearch])

  return (
    <div className="search">
      <BiSearch />
      <input
        type="text"
        value={searchText}
        onInput={(e) => setSearchText(e.currentTarget.value)}
        placeholder={placeholder}
      />

      {searchText && (
        <button
          type="button"
          className="search__clear"
          onClick={() => setSearchText('')}
        >
          <FaTimes />
        </button>
      )}
    </div>
  )
}

export default Search

Search.defaultProps = {
  placeholder: '',
  timeOut: 500,
}
