import React from 'react'
import { storiesOf } from '@storybook/react'

import RecipientListState from './RecipientList'
import Balance from './Balance'

storiesOf('Containers', module)
  .add('Recipient list', () => (
    <RecipientListState />
  ))
  .add('Balance', () => (
    <Balance />
  ))
