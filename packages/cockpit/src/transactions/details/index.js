import {
  all,
  props,
} from 'bluebird'

import {
  __,
  apply,
  assoc,
  ifElse,
  isNil,
  juxt,
  map,
  merge,
  path,
  pathSatisfies,
  pipe,
  prop,
  objOf,
  of,
  uncurryN,
} from 'ramda'

import buildResult from './result'
import chargebackOperationsMock from './chargebackOperationsMock'

const fetchRecipient = client => splitRule =>
  client.recipients.find({ id: splitRule.recipient_id })
    .then(recipient => merge(splitRule, { recipient }))

const fetchRecipients = uncurryN(2, client =>
  pipe(
    ifElse(
      pathSatisfies(isNil, ['transaction', 'split_rules']),
      pipe(
        juxt([
          path(['status', 'environment']),
          path(['company', 'default_recipient_id']),
        ]),
        apply(prop),
        objOf('recipient_id'),
        merge({ id: null }),
        of
      ),
      path(['transaction', 'split_rules'])
    ),
    map(fetchRecipient(client)),
    all
  ))

const details = client => transactionId =>
  props({
    transaction: client.transactions.find({ id: transactionId }),
    gatewayOperations: client.gatewayOperations.find({ transactionId }),
    chargebackOperations: Promise.resolve(chargebackOperationsMock),
    payables: client.payables.find({ transactionId }),
    company: client.company.current(),
    status: client.status(),
  })
    .then(data => fetchRecipients(client, data)
      .then(assoc('split_rules', __, data)))
    .then(buildResult)

export default details
