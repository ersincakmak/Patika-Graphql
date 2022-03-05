import { useField } from 'formik'
import React from 'react'

const TextField = (props) => {
  const [field, meta] = useField(props)
  return (
    <div className="field field--text">
      <input {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  )
}

export default TextField
