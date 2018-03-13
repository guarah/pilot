import React, { PureComponent } from 'react'

import Section from '../Section'
import mock from '../../../src/components/RecipientSection/recipientMock'
import RecipientSection from '../../../src/components/RecipientSection'

class RecipientSectionState extends PureComponent {
  constructor () {
    super()
    this.handleCollapse = this.handleCollapse.bind(this)
    this.state = {
      collapsed: true,
      ...mock,
    }
  }
  handleCollapse () {
    this.setState({
      collapsed: !this.state.collapsed,
    })
  }
  render () {
    const {
      amount,
      collapsed,
      installments,
      liabilities,
      name,
      net_amount, // eslint-disable-line camelcase
      status,
    } = this.state

    return (
      <Section>
        <RecipientSection
          collapsed={collapsed}
          installments={installments}
          liabilities={liabilities}
          name={name}
          netAmount={net_amount} // eslint-disable-line camelcase
          onDetailsClick={this.handleCollapse}
          status={status}
          totalAmount={amount}
        />
      </Section>
    )
  }
}

export default RecipientSectionState
