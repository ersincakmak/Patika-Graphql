import React from 'react'
import { useQuery } from '@apollo/client'
import { Link } from 'react-router-dom'
import { getAllQuestionsQuery } from '../../graphql/queries/getAllQuestions'
import { questionCreatedSubscription } from '../../graphql/subscriptions/questionCreated'
import './style.css'

const Home = () => {
  const { data, loading, subscribeToMore } = useQuery(getAllQuestionsQuery)

  subscribeToMore({
    document: questionCreatedSubscription,
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) return prev
      const newQuestion = subscriptionData.data.questionCreated
      return {
        ...prev,
        questions: [...prev.questions, newQuestion],
      }
    },
  })

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="home">
      {!data ? (
        <div>There is no question yet.</div>
      ) : (
        data?.questions?.map((question) => (
          <Link key={question.id} to={`/question/${question.id}`}>
            {question.title}
          </Link>
        ))
      )}
    </div>
  )
}

export default Home
