import { applySpec } from 'ramda'
import transactions from './transactions'
import user from './user'

const client = applySpec({
  transactions,
  user,
})

export default client
