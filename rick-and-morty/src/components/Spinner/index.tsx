import React from 'react'
import './style.scss'

interface Props {
  locate?: 'left' | 'right' | 'center'
}

function Spinner({ locate }: Props) {
  return <div className={`spinner ${locate}`} />
}

export default Spinner

Spinner.defaultProps = {
  locate: 'center',
}
