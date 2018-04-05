import {
  __,
  always,
  apply,
  applySpec,
  assoc,
  either,
  ifElse,
  isEmpty,
  isNil,
  join,
  juxt,
  map,
  negate,
  path,
  pathEq,
  pipe,
  pluck,
  prop,
  subtract,
  sum,
  when,
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
  amount: path(['balance', 'transferred', 'amount']),
  outcoming: path(['balance', 'waiting_funds', 'amount']),
  available: {
    withdrawal: path(['balance', 'available', 'amount']),
    anticipation: path(['bulk_anticipations_limit', 'maximum', 'amount']),
  },
})

const calculateRequestAmount = pipe(
  juxt([
    prop('amount'),
    pipe(prop('anticipation_fee'), negate),
    pipe(prop('fee'), negate),
  ]),
  sum
)

const buildRequests = pipe(
  prop('bulk_anticipations_pending'),
  map(applySpec({
    id: prop('id'),
    created_at: prop('date_created'),
    type: always('anticipation'),
    amount: calculateRequestAmount,
  }))
)

const buildSearchTotal = applySpec({
  outcoming: always(233213),
  outgoing: always(213123),
  net: always(21323),
})

const getOperationDate = dateType => pipe(
  path(['movement_object', dateType]),
  when(
    either(isNil, isEmpty),
    always(null)
  )
)

const transformMovementTypePropTo = (propName, to = propName) => pipe(
  path(['movement_object', propName]),
  when(either(isNil, isEmpty), always(0)),
  assoc('amount', __, { type: to })
)

const buildOperationOutcoming = ifElse(
  pathEq(['movement_object', 'type'], 'refund'),
  juxt([
    transformMovementTypePropTo('fee', 'mdr'),
  ]),
  juxt([
    transformMovementTypePropTo('amount', 'payable'),
  ])
)

const buildOperationOutgoing = ifElse(
  pathEq(['movement_object', 'type'], 'refund'),
  juxt([
    transformMovementTypePropTo('amount', 'payable'),
    transformMovementTypePropTo('anticipation_fee'),
  ]),
  juxt([
    transformMovementTypePropTo('fee', 'mdr'),
    transformMovementTypePropTo('anticipation_fee'),
  ])
)

const buildOperationsRows = pipe(
  prop('operations'),
  map(applySpec({
    id: prop('id'),
    type: path(['movement_object', 'type']),
    payment_date: {
      original: getOperationDate('original_payment_date'),
      actual: getOperationDate('payment_date'),
    },
    outcoming: buildOperationOutcoming,
    outgoing: buildOperationOutgoing,
    net: pipe(
      juxt([
        pipe(buildOperationOutcoming, pluck('amount'), sum),
        pipe(buildOperationOutgoing, pluck('amount'), sum),
      ]),
      apply(subtract)
    ),
  }))
)

export default applySpec({
  recipient: buildRecipient,
  balance: buildBalance,
  requests: buildRequests,
  search: {
    total: buildSearchTotal,
    operations: {
      total: always(2321313132),
      count: always(98324),
      offset: always(0),
      rows: buildOperationsRows,
    },
  },
})
