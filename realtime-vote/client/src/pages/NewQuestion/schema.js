import * as yup from 'yup'

export const questionFormSchema = yup.object().shape({
  title: yup.string().min(3).required().label('Title'),
  options: yup
    .array(yup.string().min(3).required().label('Option'))
    .min(2, 'You must have at least 2 options')
    .label('Options')
    .required(),
})
