import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Balance extends Component {
  constructor (props) {
    super(props)

    this.state = {}
  }

  render () {
    return (
      <div />
    )
  }
}

const cashFlowShape = PropTypes.arrayOf(
  PropTypes.shape({
    amount: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
  })
)

const numberOrStringShape = PropTypes.oneOfType([
  PropTypes.string.isRequired,
  PropTypes.number.isRequired,
])

/* eslint-disable */
Balance.propTypes = {
  balance: PropTypes.shape({
    amount: PropTypes.number.isRequired,
    available: PropTypes.shape({
      anticipation: PropTypes.number.isRequired,
      withdrawal: PropTypes.number.isRequired,
    }),
    outcoming: PropTypes.number.isRequired,
  }).isRequired,
  onAnticipationClick: PropTypes.func.isRequired,
  onDateChange: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRecipientsModalOpen: PropTypes.func.isRequired,
  onRequestCancel: PropTypes.func.isRequired,
  onWithdrawClick: PropTypes.func.isRequired,
  recipient: PropTypes.shape({
    bank_account: {
      account: PropTypes.string.isRequired,
      agency: PropTypes.string.isRequired,
      bank_code: PropTypes.string.isRequired,
      id: numberOrStringShape,
      type: PropTypes.string.isRequired,
    },
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  requests: PropTypes.arrayOf(PropTypes.shape({
    amount: PropTypes.number,
    created_at: PropTypes.string,
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  })).isRequired,
  search: PropTypes.shape({
    operations: PropTypes.shape({
      count: PropTypes.number.isRequired,
      offset: PropTypes.number.isRequired,
      rows: PropTypes.arrayOf(
        PropTypes.shape({
          id: numberOrStringShape,
          net: PropTypes.number.isRequired,
          outcoming: cashFlowShape,
          outgoing: cashFlowShape,
          payment_date: PropTypes.shape({
            original: PropTypes.string,
            actual: PropTypes.string.isRequired,
          }),
          type: PropTypes.string.isRequired,
        })
      ),
      total: PropTypes.number.isRequired,
    }),
    total: PropTypes.shape({
      net: PropTypes.number.isRequired,
      outcoming: PropTypes.number.isRequired,
      outgoing: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  t: PropTypes.func.isRequired,
}
/* eslint-enable */

export default Balance
