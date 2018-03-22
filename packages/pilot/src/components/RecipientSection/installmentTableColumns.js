import React from 'react'
import {
  always,
  both,
  complement,
  ifElse,
  is,
  isNil,
  juxt,
  map,
  pipe,
  prop,
  sum,
  unapply,
  unless,
} from 'ramda'

import currencyFormatter from '../../formatters/currency'
import dateFormatter from '../../formatters/longDate'


const getNumber = unless(
  both(is(Number), complement(Number.isNaN)),
  always(0)
)

const sumParameters = unapply(pipe(map(getNumber), sum))

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
    accessor: ['number'],
    aggregationTitle: 'TOTAIS',
    align: 'center',
    orderable: false,
    title: 'installment.number',
  },
  {
    accessor: ['status'],
    orderable: false,
    title: 'installment.status',
  },
  {
    accessor: ['payment_date'],
    align: 'center',
    orderable: false,
    renderer: renderPaymentDate,
    title: 'installment.payment_date',
  },
  {
    accessor: ['amount'],
    aggregationRenderer: currencyFormatter,
    aggregator: sumParameters,
    align: 'end',
    orderable: false,
    renderer: ({ amount }) => currencyFormatter(amount),
    title: 'installment.total',
  },
  {
    accessor: ['costs', 'mdr'],
    aggregationRenderer: currencyFormatter,
    aggregator: sumParameters,
    align: 'end',
    orderable: false,
    renderer: ({ costs }) => currencyFormatter(costs.mdr),
    title: 'installment.mdr',
  },
  {
    accessor: ['costs', 'anticipation'],
    aggregationRenderer: currencyFormatter,
    aggregator: sumParameters,
    align: 'end',
    orderable: false,
    renderer: ({ costs }) => currencyFormatter(costs.anticipation),
    title: 'installment.anticipation',
  },
  {
    accessor: ['costs', 'chargeback'],
    aggregationRenderer: currencyFormatter,
    aggregator: sumParameters,
    align: 'end',
    orderable: false,
    renderer: ({ costs }) => (
      costs.chargeback ?
        currencyFormatter(costs.chargeback) :
        currencyFormatter(costs.refund)
    ),
    title: 'installment.chargeback_refund',
  },
  {
    accessor: ['net_amount'],
    aggregationRenderer: currencyFormatter,
    aggregator: sumParameters,
    align: 'end',
    orderable: false,
    renderer: ({ costs }) => currencyFormatter(costs.net_amount),
    title: 'installment.net_amount',
  },
]

export default columns
