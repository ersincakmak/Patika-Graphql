import { useQuery } from '@apollo/client'
import React, { useEffect } from 'react'
import EventCreateForm from '../../components/EventCreateForm'
import EventRow from '../../components/EventRow'
import { GET_EVENTS } from '../../graphql/queries'
import { EVENT_CREATE_SUBSCRIPTION } from '../../graphql/subscriptions'
import styles from './style.module.css'

const Home = () => {
  const { loading, called, data, subscribeToMore } = useQuery(GET_EVENTS)

  useEffect(() => {
    if (!loading && called) {
      subscribeToMore({
        document: EVENT_CREATE_SUBSCRIPTION,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev
          return {
            events: [subscriptionData.data.eventCreated, ...prev.events],
          }
        },
      })
    }
  }, [loading, called, subscribeToMore])

  return (
    <div className={styles.page}>
      <EventCreateForm />
      <div className={styles.title}>
        <h1>Events</h1>
      </div>
      <ul className={styles.event_list}>
        {loading ? (
          <div>Loading...</div>
        ) : (
          data?.events.map((event, index) => (
            <EventRow {...event} key={index} />
          ))
        )}
      </ul>
    </div>
  )
}

export default Home
