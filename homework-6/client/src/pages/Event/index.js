import React, { useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { GET_ONE_EVENT } from '../../graphql/queries'
import styles from './style.module.css'
import EventDetail from '../../components/EventDetail'

import { useParams } from 'react-router-dom'
import { PARTICIPANT_ADD_SUBSCRIPTION } from '../../graphql/subscriptions'

const EventPage = () => {
  const { id } = useParams()

  const { loading, called, data, subscribeToMore } = useQuery(GET_ONE_EVENT, {
    variables: {
      id: Number(id),
    },
  })

  useEffect(() => {
    if (!loading && called) {
      subscribeToMore({
        document: PARTICIPANT_ADD_SUBSCRIPTION,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev

          const { participants, ...rest } = prev.event
          return {
            event: {
              ...rest,
              participants: [
                ...prev.event.participants,
                subscriptionData.data.participantCreated.user,
              ],
            },
          }
        },
      })
    }
  }, [called, loading, subscribeToMore])

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Event Detail</h1>
      <EventDetail loading={loading} event={data?.event} />
    </div>
  )
}

export default EventPage
