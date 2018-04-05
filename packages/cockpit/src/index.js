import { applySpec } from 'ramda'
import transactions from './transactions'
import balance from './balance'

const client = applySpec({
  transactions,
  balance,
})

export default client
