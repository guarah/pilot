import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {
  Card,
  CardSection,
  Table,
} from 'former-kit'

import getColumnFormatter from '../../formatters/columnTranslator'
import RecipientCard from '../RecipientCard'
import columns from './installmentTableColumns'

class RecipientSection extends PureComponent {
  constructor (props) {
    super(props)
    const formatColumns = getColumnFormatter(props.t)
    this.state = {
      columns: formatColumns(columns),
      hasError: false,
    }
  }

  componentDidCatch () {
    this.setState({ hasError: true })
  }

  render () {
    const {
      collapsed,
      onDetailsClick,
      t,
      installments,
      ...recipientProps
    } = this.props
    const { hasError } = this.state

    return (
      <Card>
        {
          !hasError &&
          <Fragment>
            <RecipientCard
              {...recipientProps}
              t={t}
            />
            <CardSection
              collapsedTitle={t('recipient.collapsedTitle')}
              collapsed={collapsed}
              title={t('recipient.title')}
              onTitleClick={this.props.onDetailsClick}
            >
              <Table
                columns={this.state.columns}
                rows={installments}
                onOrderChange={() => null}
              />
            </CardSection>
          </Fragment>
        }
        {
          hasError &&
          <p> Woops </p>
        }
      </Card>
    )
  }
}

RecipientSection.propTypes = {
  collapsed: PropTypes.bool,
  installments: PropTypes.arrayOf(PropTypes.shape({
    number: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    status: PropTypes.string,
    payment_date: PropTypes.instanceOf(moment),
    original_payment_date: PropTypes.instanceOf(moment),
    net_amount: PropTypes.number,
    costs: PropTypes.shape({
      mdr: PropTypes.number,
      anticipation: PropTypes.number,
      chargeback: PropTypes.number,
      refund: PropTypes.number,
    }),
  })).isRequired,
  liabilities: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
  netAmount: PropTypes.number.isRequired,
  onDetailsClick: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  t: PropTypes.func,
  totalAmount: PropTypes.number.isRequired,
}

RecipientSection.defaultProps = {
  collapsed: true,
  t: t => t,
}

export default RecipientSection
