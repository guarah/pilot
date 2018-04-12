import React, { PureComponent } from 'react'
import { action } from '@storybook/addon-actions'
import moment from 'moment'
import Balance from '../../../src/containers/Balance'
import Section from '../../Section'
import mock from '../../../src/containers/Balance/mock.json'

class BalanceState extends PureComponent {
  constructor () {
    super()

    this.state = {
      dates: {
        end: moment().add(1, 'month'),
        start: moment(),
      },
      ...mock,
    }
  }

  render () {
    const {
      dates,
      recipient,
      requests,
      balance,
      search,
    } = this.state
    return (
      <Section>
        <Balance
          balance={balance}
          dates={dates}
          onAnticipationClick={action('anticipation click')}
          onCancelRequestClick={action('cancel request click')}
          onDateChange={action('date change')}
          onPageChange={action('page click')}
          onWithdrawClick={action('withdraw click')}
          recipient={recipient}
          requests={requests}
          search={search}
          t={t => t}
        />
      </Section>
    )
  }
}


export default BalanceState
