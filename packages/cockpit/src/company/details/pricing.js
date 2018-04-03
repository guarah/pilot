import {
  applySpec,
  path,
  pathOr,
  reduce,
  pipe,
  pick
} from 'ramda'

const getAntifraudCost = pipe(
  pathOr([], ['gateway', 'live', 'antifraud_cost']),
  reduce((total, antifraud) => (total + antifraud.cost), 0)
)

const getGatewayCost = pipe(
  pathOr({}, ['gateway', 'live']),
  pick(['transaction_cost', 'transaction_spread', 'minimum_monthly_payment'])
)
const getPricing = pipe(
  path(['pricing']),
  applySpec({
    antifraud_cost: getAntifraudCost,
    gateway: getGatewayCost,
  })
)

export default getPricing
