import { applySpec } from 'ramda'
import pricing from './pricing'

const details = client => () => {
  const formatCompany = applySpec({
    pricing,
  })

  return client
    .company
    .current()
    .then(formatCompany)
}


export default details
