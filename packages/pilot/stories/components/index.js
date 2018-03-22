import React from 'react'
import { storiesOf } from '@storybook/react'

import RecipientCardState from './RecipientCard'
import RecipientSectionState from './RecipientSection'

storiesOf('Components', module)
  .add('Recipient Section', () => (
    <RecipientSectionState />
  ))
