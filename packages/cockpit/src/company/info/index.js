import { applySpec } from 'ramda'
import pricing from './pricing'
import apiKeys from './apiKeys'
import team from './team'

const info = client => () => client
  .company
  .current()
  .then(applySpec({
    pricing,
    apiKeys,
    team,
  }))

export default info
