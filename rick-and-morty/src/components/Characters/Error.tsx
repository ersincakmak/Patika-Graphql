import React from 'react'
import { IoSearchOutline } from 'react-icons/io5'

function Error() {
  return (
    <div className="content__error">
      <div className="content__error__image">
        <IoSearchOutline />
      </div>
      <strong>Sorry, we can&apos;t find any matches to your query</strong>
      <span>Please try another query</span>
    </div>
  )
}

export default Error
