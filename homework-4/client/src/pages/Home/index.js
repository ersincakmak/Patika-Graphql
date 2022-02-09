import { useQuery } from '@apollo/client'
import React from 'react'
import EventRow from '../../components/EventRow'
import { GET_EVENTS } from '../../graphql/queries'
import styles from './style.module.css'

const Home = () => {
  const { loading, data } = useQuery(GET_EVENTS)

  if (loading) {
    return <div>Loading ...</div>
  }

  return (
    <div className={styles.page}>
      <div className={styles.title}>
        <h1>Events</h1>
      </div>
      <ul className={styles.event_list}>
        {data?.events.map((event, index) => (
          <EventRow {...event} key={index} />
        ))}
      </ul>
    </div>
  )
}

export default Home
