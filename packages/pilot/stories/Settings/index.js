import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import CompanySettings from '../../src/containers/Settings/Company';
import UserSettings from '../../src/containers/Settings/User';

storiesOf('Settings', module)
  .add('Company Settings', () => (
    <CompanySettings />
  ))
  .add('User Settings', () => (
    <UserSettings
      handlePasswordFormSubmit={action('personal form submit')}
    />
  ))