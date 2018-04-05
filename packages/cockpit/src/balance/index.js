import buildResult from './result'

const balance = client => (recipientId, {
  count,
  page,
  start_date,
  end_date,
} = {}) =>
  Promise.props({
    recipient: client.recipients.find({ id: recipientId }),
    balance: client.balance.find({ recipientId }),
    bulk_anticipations_limit: client.bulkAnticipations.limits({ recipientId }),
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
