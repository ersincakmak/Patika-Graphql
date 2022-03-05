import { useMutation, useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { getOneQuestionQuery } from '../../graphql/queries/getOneQuestion'
import { voteMutation } from '../../graphql/mutations/vote'
import { Line } from 'rc-progress'
import './style.css'
import { questionVotedSubscription } from '../../graphql/subscriptions/questionVoted'

const Question = () => {
  const { id } = useParams()
  const [selectedOption, setselectedOption] = useState('')

  const {
    data: queryData,
    loading: queryLoading,
    called: queryCalled,
    subscribeToMore,
  } = useQuery(getOneQuestionQuery, {
    variables: {
      questionId: id,
    },
  })

  subscribeToMore({
    document: questionVotedSubscription,
    variables: {
      questionId: id,
    },
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) return prev
      const { questionVoted } = subscriptionData.data
      const { question } = prev
      return {
        ...prev,
        question: {
          ...question,
          votes: questionVoted.votes,
        },
      }
    },
  })

  const [vote, { called: mutationCalled }] = useMutation(voteMutation)

  if (queryLoading && !queryCalled) {
    return <div> Loading ...</div>
  }

  if (queryCalled && !queryData) {
    return <div> Question not found</div>
  }

  const voteHandler = () => {
    if (selectedOption) {
      vote({
        variables: {
          input: {
            questionId: id,
            optionTitle: selectedOption,
          },
        },
      })
    }
  }

  return (
    <div className="question">
      <h1>{queryData.question.title}</h1>
      {!mutationCalled ? (
        <>
          <ul>
            {queryData.question.options.map((option, index) => (
              <label key={index}>
                <input
                  type="radio"
                  name="questionOption"
                  value={option.title}
                  checked={selectedOption === option.title}
                  onChange={(e) => setselectedOption(e.target.value)}
                />
                {option.title}
              </label>
            ))}
          </ul>
          <button onClick={voteHandler}>Vote</button>
        </>
      ) : (
        queryData.question.options.map((option, index) => (
          <div className="vote" key={index}>
            <div className="voteText">
              <strong>{option.title}</strong>
              <span className="votePercent">
                {`%${Math.round(
                  (option.voteCount /
                    queryData.question.options.reduce(
                      (acc, cur) => acc + cur.voteCount,
                      0
                    )) *
                    100
                )}`}
              </span>
            </div>
            <Line
              percent={
                (option.voteCount /
                  queryData.question.options.reduce(
                    (acc, cur) => acc + cur.voteCount,
                    0
                  )) *
                100
              }
              strokeWidth="1"
              strokeColor="#2db7f5"
              trailColor="#d9d9d9"
            />
          </div>
        ))
      )}
    </div>
  )
}

export default Question
