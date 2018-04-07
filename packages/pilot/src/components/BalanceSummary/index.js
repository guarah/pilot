import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { CardSection } from 'former-kit'
import IconForward from 'emblematic-icons/svg/ArrowForward24.svg'

import TotalDisplay from '../TotalDisplay'

import style from './style.css'

const renderDate = (isoDate) => {
  const date = moment(isoDate)

  return (
    <div className={style.date}>
      <h3>{date.format('DD')}</h3>
      <div>
        <strong>{date.format('MMMM')} {date.year()}</strong>
        <span>{date.format('dddd')}</span>
      </div>
    </div>
  )
}

const colors = {
  net: '#4ca9d7',
  outcoming: '#37cc9a',
  outgoing: '#ff796f',
}

const BalanceSummary = ({ amount, dates }) => (
  <CardSection>
    <div className={style.content}>
      <div className={style.dates}>
        { renderDate(dates.start) }
        <IconForward className={style.icon} />
        { renderDate(dates.end) }
      </div>

      <div className={style.amount}>
        {
          Object.keys(amount).map(type => (
            <TotalDisplay
              title={amount[type].title}
              amount={amount[type].value}
              color={colors[type]}
              unity={amount[type].unity}
            />
          ))
        }
      </div>
    </div>
  </CardSection>
)

BalanceSummary.propTypes = {
  amount: PropTypes.arrayOf(PropTypes.shape({
    net: PropTypes.shape({
      title: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      unity: PropTypes.string,
    }).isRequired,
    outcoming: PropTypes.shape({
      title: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      unity: PropTypes.string,
    }).isRequired,
    outgoing: PropTypes.shape({
      title: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      unity: PropTypes.string,
    }).isRequired,
  })).isRequired,
  dates: PropTypes.shape({
    end: PropTypes.instanceOf(Date).isRequired,
    start: PropTypes.instanceOf(Date).isRequired,
  }).isRequired,
}

export default BalanceSummary
