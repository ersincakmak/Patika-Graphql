import { useMutation, useQuery } from '@apollo/client'
import moment from 'moment'
import { useEffect, useRef, useState } from 'react'
import './App.css'
import createMessageMutation from './graphql/mutations/createMessage'
import getMessages from './graphql/queries/getMessages'
import messageCreated from './graphql/subscriptions/messageCreated'

const App = () => {
  const [message, setMessage] = useState('')
  const { loading, called, data, subscribeToMore } = useQuery(getMessages)
  const [createMessage] = useMutation(createMessageMutation)

  const ref = useRef(null)

  const setMessageHandler = (e) => setMessage(e.target.value)

  const crateMessageHandler = () => {
    if (message.length > 0) {
      createMessage({
        variables: {
          message,
        },
      })
      setMessage('')
    }
  }

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight
    }
  }, [data])

  useEffect(() => {
    if (!loading && called) {
      subscribeToMore({
        document: messageCreated,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev
          const newMessage = subscriptionData.data.messageCreated
          return {
            ...prev,
            messages: [...prev.messages, newMessage],
          }
        },
      })
    }
  }, [loading, called, subscribeToMore])

  return (
    <>
      <h1>Anonymous Chat</h1>
      <div className="wrapper" ref={ref}>
        {!loading &&
          called &&
          data?.messages?.map((message, index) => (
            <div key={index} className="message">
              <p className="message__text">{message.message}</p>
              <span className="message__date">
                {moment(moment(new Date(message.date)).toDate()).format(
                  'MM/DD/YYYY hh:mm:ssA'
                )}
              </span>
            </div>
          ))}
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Your message"
            value={message}
            onChange={setMessageHandler}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                crateMessageHandler()
              }
            }}
          />
          <button onClick={crateMessageHandler} disabled={message.length < 1}>
            Send
          </button>
        </div>
      </div>
    </>
  )
}

export default App
