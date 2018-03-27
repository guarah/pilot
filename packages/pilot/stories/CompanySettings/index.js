import React from 'react'
import { storiesOf } from '@storybook/react'
import CompanySettings from '../../src/containers/CompanySettings';

storiesOf('Comany Settings', module)
  .add('Company Settings', () => (
    <CompanySettings />
  ))