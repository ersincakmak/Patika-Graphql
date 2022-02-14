import { useField } from 'formik'
import React from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import styles from './style.module.css'
import './selectStyle.css'
import Select from 'react-select'

const InputComponent = (props) => {
  switch (props.type) {
    case 'textarea':
      return <TextareaAutosize {...props} minRows={2} />
    case 'select':
      return (
        <Select
          value={
            props.options.find((option) => option.value === props.value) ?? ''
          }
          onChange={(value) => props.helper.setValue(value.value)}
          onBlur={props.onBlur}
          onFocus={props.onFocus}
          name={props.name}
          options={props.options}
          classNamePrefix={'react-select'}
          placeholder={props.placeholder}
          isSearchable={props.searchable}
          isLoading={props.loading}
          isDisabled={props.disabled}
        />
      )
    default:
      return <input {...props} />
  }
}

const FormField = (props) => {
  const [field, meta, helper] = useField(props)

  return (
    <div className={styles.container}>
      <InputComponent
        className={styles.input}
        helper={props.type === 'select' ? helper : undefined}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className={styles.error}>{meta.error}</div>
      ) : null}
    </div>
  )
}

export default FormField
