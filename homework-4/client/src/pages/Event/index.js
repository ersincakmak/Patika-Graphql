import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_ONE_EVENT } from '../../graphql/queries'
import styles from './style.module.css'
import EventDetail from '../../components/EventDetail'

import { useParams } from 'react-router-dom'

const EventPage = () => {
  const { id } = useParams()

  const { loading, data } = useQuery(GET_ONE_EVENT, {
    variables: {
      id: Number(id),
    },
  })

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Event Detail</h1>
      <EventDetail loading={loading} event={data?.event} />
    </div>
  )
}

export default EventPage
