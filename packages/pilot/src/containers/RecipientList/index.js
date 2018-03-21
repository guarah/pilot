import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {
  append,
  complement,
  contains,
  equals,
  filter,
  ifElse,
  uncurryN,
} from 'ramda'
import {
  Card,
  CardContent,
  CardTitle,
} from 'former-kit'

import RecipientSection from '../../components/RecipientSection'
import style from './style.css'

const notContains = complement(contains)
const notEqual = complement(equals)

const toggleListItem = uncurryN(2, item => ifElse(
  contains(item),
  filter(notEqual(item)),
  append(item)
))

class RecipientList extends Component {
  constructor () {
    super()

    this.state = {
      expandedItems: [],
    }
    this.handleItemExpand = this.handleItemExpand.bind(this)
  }

  handleItemExpand (itemIndex) {
    const { expandedItems } = this.state
    this.setState({
      expandedItems: toggleListItem(itemIndex, expandedItems),
    })
  }

  renderRecipientList () {
    const {
      collapseInstallmentTitle,
      expandInstallmentTitle,
      installmentTotalLabel,
      liabilitiesLabel,
      netAmountLabel,
      outAmountLabel,
      recipients,
      statusLabel,
      installmentsTableColumns,
    } = this.props

    return recipients.map((recipient, index) => {
      const {
        installments,
        liabilities,
        name,
        net_amount, // eslint-disable-line camelcase
        status,
        amount,
      } = recipient
      const collapsed = notContains(index, this.state.expandedItems)
      const onClick = this.handleItemExpand.bind(this, index)
      const key = `recipient_${index}`
      return (
        <RecipientSection
          className={style.recipient}
          key={key}
          collapsed={collapsed}
          collapsedTitle={collapseInstallmentTitle}
          columns={installmentsTableColumns}
          installments={installments}
          liabilities={liabilities}
          liabilitiesLabel={liabilitiesLabel}
          name={name}
          netAmount={net_amount} // eslint-disable-line camelcase
          netAmountLabel={netAmountLabel}
          onDetailsClick={onClick}
          outAmountLabel={outAmountLabel}
          status={status}
          statusLabel={statusLabel}
          title={expandInstallmentTitle}
          totalAmount={amount}
          totalLabel={installmentTotalLabel}
        />
      )
    })
  }

  render () {
    const {
      noRecipientLabel,
      recipients,
      title,
      total,
      totalRecipientsLabel,
      totalTitle,
    } = this.props

    const totalRecipients = recipients ? recipients.length : 0
    return (
      <Card>
        <CardTitle
          className={style.titleContainer}
          title={title}
          subtitle={<span className={style.subtitle}>{totalTitle}</span>}
        />
        <CardContent>
          <div className={style.totals}>
            <span className={style.recipientsLabel}>
              {totalRecipients > 0 ?
                `${totalRecipients} ${totalRecipientsLabel}` :
                noRecipientLabel
              }
            </span>
            <span className={style.total}> {total} </span>
          </div>
        </CardContent>
        <CardContent>
          {this.renderRecipientList()}
        </CardContent>
      </Card>
    )
  }
}

RecipientList.propTypes = {
  installmentsTableColumns: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    accessor: PropTypes.arrayOf(PropTypes.string),
    orderable: PropTypes.bool,
  })).isRequired,
  recipients: PropTypes.arrayOf(PropTypes.shape({
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
    net_amount: PropTypes.number.isRequired, // eslint-disable-line camelcase
    status: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
  })).isRequired,
  collapseInstallmentTitle: PropTypes.string,
  expandInstallmentTitle: PropTypes.string,
  installmentTotalLabel: PropTypes.string,
  liabilitiesLabel: PropTypes.string,
  netAmountLabel: PropTypes.string,
  noRecipientLabel: PropTypes.string,
  outAmountLabel: PropTypes.string,
  statusLabel: PropTypes.string,
  title: PropTypes.string,
  total: PropTypes.string.isRequired,
  totalRecipientsLabel: PropTypes.string,
  totalTitle: PropTypes.string,
}

RecipientList.defaultProps = {
  collapseInstallmentTitle: '',
  expandInstallmentTitle: '',
  installmentTotalLabel: '',
  liabilitiesLabel: '',
  netAmountLabel: '',
  noRecipientLabel: '',
  outAmountLabel: '',
  statusLabel: '',
  title: '',
  totalRecipientsLabel: '',
  totalTitle: '',
}

export default RecipientList
