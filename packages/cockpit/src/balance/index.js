import Promise from 'bluebird'
import { nextBusinessDay } from 'business-moment'
import moment from 'moment'
import {
  __,
  assoc,
} from 'ramda'
import buildResult from './result'

const getBulkAnticipationsLimits = (client, recipientId) =>
  nextBusinessDay('brazil', moment().toDate())
    .then(paymentDate => paymentDate.getTime())
    .then(assoc('payment_date', __, { recipientId, timeframe: 'start' }))
    .then(client.bulkAnticipations.limits)

const balance = client => (recipientId, {
  count,
  page,
  start_date,
  end_date,
} = {}) =>
  Promise.props({
    recipient: client.recipients.find({ id: recipientId }),
    balance: client.balance.find({ recipientId }),
    bulk_anticipations_limit: getBulkAnticipationsLimits(client, recipientId),
    bulk_anticipations_pending: client.bulkAnticipations.find({
      recipientId,
      status: 'pending',
    }),
    operations: client.balanceOperations.find({
      recipientId,
      count,
      page,
      start_date,
      end_date,
    }),
  })
    .then(buildResult)

export default balance
