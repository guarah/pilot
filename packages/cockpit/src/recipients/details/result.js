import {
  applySpec,
  join,
  juxt,
  path,
  pipe,
  prop,
} from 'ramda'

const getWithDv = propName => pipe(
  juxt([
    path(['bank_account', propName]),
    path(['bank_account', `${propName}_dv`]),
  ]),
  join('-')
)

const buildRecipient = pipe(
  prop('recipient'),
  applySpec({
    id: prop('id'),
    name: path(['bank_account', 'legal_name']),
    bank_account: {
      id: path(['bank_account', 'id']),
      type: path(['bank_account', 'type']),
      bank_code: path(['bank_account', 'bank_code']),
      agency: getWithDv('agencia'),
      account: getWithDv('conta'),
    },
  })
)

const buildBalance = applySpec({
  amount: path(['balance', 'available', 'amount']),
  outcoming: path(['balance', 'waiting_funds', 'amount']),
  available: {
    withdrawal: path(['balance', 'transferred', 'amount']),
  },
})

export default applySpec({
  recipient: buildRecipient,
  balance: buildBalance,
})
