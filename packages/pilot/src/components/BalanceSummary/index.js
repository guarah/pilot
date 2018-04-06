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

const BalanceSummary = ({ amount, dates }) => (
  <CardSection>
    <div className={style.content}>
      <div className={style.dates}>
        { renderDate(dates.start) }
        <IconForward className={style.icon} />
        { renderDate(dates.end) }
      </div>

      <div className={style.amount}>
        <TotalDisplay
          title="Total de entradas"
          amount={amount.outcoming}
          color="#37cc9a"
          unity="R$"
        />

        <TotalDisplay
          title="Total de Saídas"
          amount={amount.outgoing}
          color="#ff796f"
          unity="R$"
        />

        <TotalDisplay
          title="Total Liquido"
          amount={amount.net}
          color="#4ca9d7"
          unity="R$"
        />
      </div>
    </div>
  </CardSection>
)


BalanceSummary.propTypes = {
  amount: PropTypes.shape({
    net: PropTypes.number.isRequired,
    outcoming: PropTypes.number.isRequired,
    outgoing: PropTypes.number.isRequired,
  }).isRequired,
  dates: PropTypes.shape({
    end: PropTypes.instanceOf(Date).isRequired,
    start: PropTypes.instanceOf(Date).isRequired,
  }).isRequired,
}

export default BalanceSummary
