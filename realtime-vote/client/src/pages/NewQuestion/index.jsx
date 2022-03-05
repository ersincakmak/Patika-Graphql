import React, { useEffect } from 'react'
import { useFormik, FormikProvider, FieldArray } from 'formik'
import './style.css'
import { questionFormSchema } from './schema'
import { TextField } from '../../components/FormField'
import { useMutation } from '@apollo/client'
import { createQuestionMutation } from '../../graphql/mutations/createQuestion'
import { useNavigate } from 'react-router-dom'

const NewQuestion = () => {
  const [createQuestion, { data, called, loading }] = useMutation(
    createQuestionMutation
  )
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && called && data) {
      navigate(`/question/${data.createQuestion.id}`)
    }
  }, [loading, data, called, navigate])

  const formik = useFormik({
    initialValues: {
      title: '',
      options: new Array(2).fill(''),
    },
    validationSchema: questionFormSchema,
    onSubmit: (values) => {
      createQuestion({
        variables: {
          input: values,
        },
      })
    },
  })

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit} className="newQuestion-container">
        <h3>Question</h3>
        <TextField
          name="title"
          type="text"
          placeholder="Type your question here"
        />
        <h3>Options</h3>
        <FieldArray
          name="options"
          render={(arrayHelpers) => (
            <div className="fieldList">
              {formik.values.options &&
                formik.values.options.map((option, index) => (
                  <div key={index} className="fieldList__item">
                    <TextField
                      name={`options.${index}`}
                      placeholder="Enter poll option"
                    />
                    {formik.values.options.length > 2 && (
                      <button onClick={() => arrayHelpers.remove(index)}>
                        X
                      </button>
                    )}
                  </div>
                ))}
              <div className="fieldList__buttons">
                <button type="button" onClick={() => arrayHelpers.push('')}>
                  Add a poll option
                </button>
                <button type="submit">Submit</button>
              </div>
            </div>
          )}
        />
      </form>
    </FormikProvider>
  )
}

export default NewQuestion
