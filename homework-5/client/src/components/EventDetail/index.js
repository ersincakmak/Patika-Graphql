import React from 'react'
import styles from './style.module.css'
import moment from 'moment'
import { AiFillCalendar } from 'react-icons/ai'
import { GrMapLocation } from 'react-icons/gr'

const Info = ({ Icon, title, subTitle }) => {
  return (
    <div className={styles.info}>
      {Icon && (
        <div className={styles.info_icon}>
          <Icon />
        </div>
      )}
      <div className={styles.info_labels}>
        {title && <span className={styles.info_primaryLabel}>{title}</span>}
        {subTitle && (
          <span className={styles.info_secondaryLabel}>{subTitle}</span>
        )}
      </div>
    </div>
  )
}

const EventDetail = ({ event, loading }) => {
  if (loading) {
    return <div>Loading ...</div>
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{event.title}</h1>

      <Info
        Icon={AiFillCalendar}
        title={moment(new Date(event.date)).format('MM.DD.YYYY')}
        subTitle={`${event.from}-${event.to}`}
      />

      <Info Icon={GrMapLocation} title={event.location.name} />

      <div className={styles.about}>
        <h1>Description</h1>
        <p>{event.desc}</p>
      </div>

      <div className={styles.divider}>
        <span>Participants</span>
      </div>

      {event.participants.length > 0 ? (
        <ul className={styles.participant_list}>
          {event.participants.map(({ user }) => (
            <li key={user.id} className={styles.participant_row}>
              <span className={styles.participant_username}>
                {user.username}
              </span>
              {' / '}
              <span>{user.email}</span>
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.message}>There is no participant yet.</div>
      )}
    </div>
  )
}

export default EventDetail
