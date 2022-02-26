import React from 'react'
import { BiSearch } from 'react-icons/bi'
import './style.scss'

function Header() {
  return (
    <header>
      <p className="title">Wubba Lubba Dub Dub.</p>
      <div className="inputContainer">
        <BiSearch className="icon" />
        <input type="text" placeholder="Search" />
      </div>
    </header>
  )
}

export default Header
