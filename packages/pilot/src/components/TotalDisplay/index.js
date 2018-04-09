import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import currencyFormatter from '../../formatters/currency'
import style from './style.css'

const renderSymbol = (value) => {
  if (value < 0) {
    return '-'
  }

  if (value > 0) {
    return '+'
  }

  return null
}

const TotalDisplay = ({
  amount,
  color,
  subtitle,
  title,
  unity,
}) => (
  <div
    className={cx(style.content, {
      [style.withSubtitle]: subtitle,
    })}
  >
    <div className={style.title}>
      <h2 style={{ color }}>{title}</h2>
      <span>({unity})</span>
    </div>

    <div className={style.amount}>
      <small style={{ color }}>
        {renderSymbol(amount)}
      </small>
      <h3>{currencyFormatter(amount).replace('R$', '').replace('-', '')}</h3>
    </div>

    {subtitle &&
      <div className={style.subtitle}>
        {subtitle}
      </div>
    }
  </div>
)

TotalDisplay.propTypes = {
  amount: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  subtitle: PropTypes.node,
  title: PropTypes.string.isRequired,
  unity: PropTypes.string.isRequired,
}

TotalDisplay.defaultProps = {
  subtitle: null,
}

export default TotalDisplay
