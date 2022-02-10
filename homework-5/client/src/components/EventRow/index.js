import moment from 'moment'
import React from 'react'
import styles from './style.module.css'
import { Link } from 'react-router-dom'

const EventRow = ({ title, desc, date, id }) => {
  return (
    <li>
      <Link to={`/event/${id}`} className={styles.event_row}>
        <div className={styles.title}>
          <h4>{title}</h4>
          <span>{moment(new Date(date)).format('MM.DD.YYYY')}</span>
        </div>
        <p className={styles.desc}>
          {desc.slice(0, 150).trimEnd()}
          {desc.length > 150 && '...'}
        </p>
      </Link>
    </li>
  )
}

export default EventRow
