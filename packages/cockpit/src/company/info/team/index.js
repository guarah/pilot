import moment from 'moment'
import {
  pipe,
  pathOr,
  applySpec,
  map,
  isNil,
  unless,
} from 'ramda'

const formarDate = date => moment(date).format('DD/MM/YYYY')

const formatUser = applySpec({
  id: pathOr('', ['id']),
  email: pathOr('', ['email']),
  name: pathOr('', ['name']),
  role: pathOr('', ['permission']),
  date_created: pipe(
    pathOr(null, ['date_created']),
    unless(isNil, formarDate)
  ),
})

export default pipe(
  pathOr([], ['users']),
  map(formatUser)
)
