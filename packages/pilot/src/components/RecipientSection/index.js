import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
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
      <Card className={style.recipienSection}>
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
            <CardSection
              collapsedTitle={collapsedTitle}
              collapsed={collapsed}
              title={title}
              onTitleClick={onDetailsClick}
            >
              <hr className={style.divider} />
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
  outAmountLabel: PropTypes.string,
  onDetailsClick: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  statusLabel: PropTypes.string,
  totalAmount: PropTypes.number.isRequired,
  title: PropTypes.string,
  collapsedTitle: PropTypes.string,
  totalLabel: PropTypes.string,
}

RecipientSection.defaultProps = {
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
