import { useMutation, useQuery } from '@apollo/client'
import { FormikProvider, useFormik } from 'formik'
import React from 'react'
import { ADD_EVENT_MUTATION } from '../../graphql/mutations'
import { GET_ALL_LOCATIONS, GET_ALL_USERS } from '../../graphql/queries'
import eventCreateValidation from '../../validations/eventCreateValidation'
import FormField from '../FormField'
import Spinner from '../Spinner'
import styles from './style.module.css'

const EventCreateForm = () => {
  const { loading: userLoading, data: userData } = useQuery(GET_ALL_USERS)
  const { loading: locationLoading, data: locationData } =
    useQuery(GET_ALL_LOCATIONS)

  const [addEventMutation, { loading }] = useMutation(ADD_EVENT_MUTATION)

  const userOptions =
    userData?.users?.map((user) => ({
      value: user.id,
      label: user.username,
    })) ?? []

  const locationOptions =
    locationData?.locations?.map((location) => ({
      value: location.id,
      label: location.name,
    })) ?? []

  const handleFormSubmit = (values, helpers) => {
    addEventMutation({
      variables: {
        input: {
          ...values,
        },
      },
    })
  }

  const formik = useFormik({
    initialValues: {
      title: '',
      desc: '',
      date: '',
      from: '',
      to: '',
      location_id: '',
      user_id: '',
    },
    validationSchema: eventCreateValidation,
    onSubmit: handleFormSubmit,
  })

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>Event Create Form</h1>
      </div>
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit} className={styles.form}>
          <FormField
            name="title"
            placeholder="Title"
            type="text"
            disabled={loading}
          />
          <FormField
            name="desc"
            placeholder="Description"
            type="textarea"
            disabled={loading}
          />
          <FormField
            name="date"
            placeholder="Date"
            type="date"
            disabled={loading}
          />
          <FormField
            name="from"
            placeholder="From"
            type="text"
            disabled={loading}
          />
          <FormField
            name="to"
            placeholder="To"
            type="text"
            disabled={loading}
          />
          <FormField
            name="location_id"
            placeholder="Location"
            loading={locationLoading}
            options={locationOptions}
            searchable
            type="select"
            disabled={loading}
          />
          <FormField
            name="user_id"
            placeholder="User"
            options={userOptions}
            loading={userLoading}
            type="select"
            disabled={loading}
          />
          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? <Spinner /> : 'Create'}
          </button>
        </form>
      </FormikProvider>
    </div>
  )
}

export default EventCreateForm
