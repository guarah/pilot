import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { join } from 'ramda'
import {
  Col,
  Grid,
  Legend,
  Row,
} from 'former-kit'

import numberFormat from '../../formatters/decimalCurrency'
import legendStatus from '../../models/statusLegends'
import style from './style.css'

const RecipientCard = ({
  liabilities,
  name,
  netAmount,
  status,
  totalAmount,
  t,
}) => (
  <div className={style.recipient}>
    <Grid >
      <Row
        flex
        className={style.row}
      >
        <Col
          align="start"
          className={style.description}
        >
          <span className={style.title}>{name}</span>
        </Col>
        <Col
          align="end"
          className={style.summary}
        >
          <span>
            {t('recipient.total')}
          </span>
          <span className={classNames(
              style.total,
              style.amount
            )}
          >
            {numberFormat(totalAmount)}
          </span>
        </Col>
      </Row>
      <Row
        flex
        className={style.row}
      >
        <Col
          align="start"
          className={style.description}
        >
          { `${t('recipient.liabilities')}: ${join(', ', liabilities)}` }
        </Col>
        <Col
          align="end"
          className={style.summary}
        >
          <span>
            {t('recipient.outAmount')}
          </span>
          <span className={style.amount}>
            { numberFormat(netAmount - totalAmount) }
          </span>
        </Col>
      </Row>
      <Row
        flex
        className={style.row}
      >
        <Col
          align="start"
          className={style.description}
        >
          {legendStatus[status].text}
          <Legend
            color={legendStatus[status].color}
            acronym={legendStatus[status].acronym}
            hideLabel
          >
            {legendStatus[status].text}
          </Legend>
        </Col>
        <Col
          align="end"
          className={style.summary}
        >
          <span>
            {t('recipient.netAmount')}
          </span>
          <span className={style.amount}>
            { numberFormat(netAmount) }
          </span>
        </Col>
      </Row>
    </Grid>
  </div>
)

RecipientCard.propTypes = {
  liabilities: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
  netAmount: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  totalAmount: PropTypes.number.isRequired,
  t: PropTypes.func,
}

RecipientCard.defaultProps = {
  t: t => t,
}

export default RecipientCard
