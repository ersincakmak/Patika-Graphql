import * as yup from 'yup'
import { hourRegex24Hour } from '../constants/regex'

export default yup.object().shape({
  title: yup.string().min(5).required().label('Title'),
  desc: yup.string().min(10).required().label('Description'),
  date: yup
    .date()
    .min(
      new Date(new Date().toDateString()),
      'Date field must be grater than today.'
    )
    .required()
    .label('Date'),
  from: yup
    .string()
    .matches(hourRegex24Hour, 'From field should be HH:MM 24 hour format.')
    .required()
    .label('From'),
  to: yup
    .string()
    .matches(hourRegex24Hour, 'To field should be HH:MM 24 hour format.')
    .required()
    .label('To'),
  location_id: yup.number().required().label('Location'),
  user_id: yup.number().required().label('User'),
})
