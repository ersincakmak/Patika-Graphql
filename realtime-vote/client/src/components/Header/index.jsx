import React from 'react'
import './style.css'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header>
      <ul>
        <li>
          <Link to="/">Questions</Link>
        </li>
        <li>
          <Link to="/new">New</Link>
        </li>
      </ul>
    </header>
  )
}

export default Header
