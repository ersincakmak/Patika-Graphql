import React from 'react'
import './style.scss'

type Props = {
  value: string
  label: string
  checked: boolean
  name: string
  onChange: (val: string) => void
}

function RadioBtn({ label, value, checked, name, onChange }: Props) {
  const id = `${name}-${value}`
  return (
    <label htmlFor={id} className="radio">
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        onChange={() => onChange(value)}
        checked={checked}
      />
      <span className="radio__icon" />
      <span className="radio__label">{label}</span>
    </label>
  )
}

export default RadioBtn
