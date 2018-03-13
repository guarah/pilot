import React from 'react'
import {
  juxt,
  ifElse,
  isNil,
  pipe,
  prop,
} from 'ramda'

import currencyFormatter from '../../formatters/currency'
import dateFormatter from '../../formatters/longDate'

/* eslint-disable camelcase */
const getPaymentDatesComponent = ([payment_date, original_payment_date]) => (
  <div>
    <div>
      {`de: ${original_payment_date}`}
    </div>
    <div>
      {`p/: ${payment_date}`}
    </div>
  </div>
)
/* eslint-enable camelcase */

const validatePaymentDate = pipe(
  prop('payment_date'),
  isNil
)

const getOriginalPaymentDate = pipe(
  prop('original_payment_date'),
  dateFormatter
)

const getPaymentDate = pipe(
  prop('payment_date'),
  dateFormatter
)

const renderPaymentDate = ifElse(
  validatePaymentDate,
  getOriginalPaymentDate,
  pipe(
    juxt([
      getPaymentDate,
      getOriginalPaymentDate,
    ]),
    getPaymentDatesComponent
  )
)

const columns = [
  {
    title: 'installment.number',
    accessor: ['number'],
    orderable: false,
  },
  {
    title: 'installment.status',
    accessor: ['status'],
    orderable: false,
  },
  {
    title: 'installment.payment_date',
    accessor: ['payment_date'],
    renderer: renderPaymentDate,
    orderable: false,
  },
  {
    title: 'installment.total',
    accessor: ['amount'],
    renderer: ({ amount }) => currencyFormatter(amount),
    orderable: false,
  },
  {
    title: 'installment.mdr',
    accessor: ['costs', 'mdr'],
    renderer: ({ costs }) => currencyFormatter(costs.mdr),
    orderable: false,
  },
  {
    title: 'installment.anticipation',
    accessor: ['costs', 'anticipation'],
    renderer: ({ costs }) => currencyFormatter(costs.anticipation),
    orderable: false,
  },
  {
    title: 'installment.chargeback_refund',
    accessor: ['costs', 'chargeback'],
    renderer: ({ costs }) => (
      costs.chargeback ?
        currencyFormatter(costs.chargeback) :
        currencyFormatter(costs.refund)
    ),
    orderable: false,
  },
  {
    title: 'installment.net_amount',
    accessor: ['net_amount'],
    renderer: ({ costs }) => currencyFormatter(costs.net_amount),
    orderable: false,
  },
]

export default columns
