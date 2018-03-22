import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import classNames from 'classnames'
import {
  Card,
  CardSection,
  Table,
} from 'former-kit'

import RecipientCard from '../RecipientCard'
import style from './style.css'

class RecipientSection extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      columns: props.columns,
      hasError: false,
    }
  }

  componentDidCatch () {
    this.setState({ hasError: true })
  }

  render () {
    const {
      className,
      collapsed,
      collapsedTitle,
      installments,
      liabilities,
      liabilitiesLabel,
      name,
      netAmount,
      netAmountLabel,
      onDetailsClick,
      outAmountLabel,
      status,
      statusLabel,
      title,
      totalAmount,
      totalLabel,
    } = this.props
    const { hasError } = this.state

    return (
      <Card className={classNames(
          style.recipientSection,
          className
        )}
      >
        {
          !hasError &&
          <Fragment>
            <RecipientCard
              liabilities={liabilities}
              liabilitiesLabel={liabilitiesLabel}
              name={name}
              netAmount={netAmount}
              netAmountLabel={netAmountLabel}
              outAmountLabel={outAmountLabel}
              status={status}
              statusLabel={statusLabel}
              totalAmount={totalAmount}
              totalLabel={totalLabel}
            />
            <hr className={style.divider} />
            <CardSection
              collapsedTitle={collapsedTitle}
              collapsed={collapsed}
              title={title}
              onTitleClick={onDetailsClick}
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
  className: PropTypes.string,
  collapsed: PropTypes.bool,
  collapsedTitle: PropTypes.string,
  columns: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    accessor: PropTypes.arrayOf(PropTypes.string),
    orderable: PropTypes.bool,
  })).isRequired,
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
  liabilitiesLabel: PropTypes.string,
  name: PropTypes.string.isRequired,
  netAmount: PropTypes.number.isRequired,
  netAmountLabel: PropTypes.string,
  onDetailsClick: PropTypes.func.isRequired,
  outAmountLabel: PropTypes.string,
  status: PropTypes.string.isRequired,
  statusLabel: PropTypes.string,
  title: PropTypes.string,
  totalAmount: PropTypes.number.isRequired,
  totalLabel: PropTypes.string,
}

RecipientSection.defaultProps = {
  className: '',
  collapsed: true,
  collapsedTitle: '',
  liabilitiesLabel: '',
  netAmountLabel: '',
  outAmountLabel: '',
  statusLabel: '',
  title: '',
  totalLabel: '',
}

export default RecipientSection