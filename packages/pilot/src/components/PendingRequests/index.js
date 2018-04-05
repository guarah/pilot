import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Card,
  CardContent,
  CardTitle,
} from 'former-kit'
import { isEmpty } from 'ramda'

import IconClose from 'emblematic-icons/svg/ClearClose24.svg'

import style from './style.css'

const renderRequests = (requests, onCancelHandler) => requests.map((
  {
    // eslint-disable-next-line camelcase
    title: requestTitle, created_at, amount,
  },
  index
) => (
  <tr
    key={`${created_at}_${requestTitle}_${amount}`} // eslint-disable-line camelcase
  >
    <td className={style.createdAt}>{created_at}</td> {/* eslint-disable-line camelcase */}
    <td>{requestTitle}</td>
    <td className={style.amount}>{amount}</td>
    <td className={style.cancel}>
      <Button
        fill="outline"
        icon={<IconClose width={12} height={12} />}
        onClick={() => onCancelHandler(index)}
        size="tiny"
      />
    </td>
  </tr>
))

const PendingRequests = ({
  title,
  requests,
  onCancel,
}) => (
  <Card>
    <CardTitle className={style.title} title={title} />
    <CardContent>
      { !isEmpty(requests) &&
        <table className={style.table}>
          {renderRequests(requests, onCancel)}
        </table>
      }
    </CardContent>
  </Card>
)

PendingRequests.propTypes = {
  onCancel: PropTypes.func.isRequired,
  requests: PropTypes.arrayOf(
    PropTypes.shape({
      amount: PropTypes.string.isRequired,
      created_at: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  title: PropTypes.string.isRequired,
}

export default PendingRequests
