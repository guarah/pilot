import React from 'react'
import { action } from '@storybook/addon-actions'

import Section from '../../Section'
import ApiKey from '../../../src/components/ApiKey';

const ApiKeySection = () => (
  <Section>
    <ApiKey
      title="Live"
      apiKey="ak_live_aPghlmmyj73TBbWY4bxdQRUaB1OpJj"
      onCopy={() => action('copyLink')}
      copyLabel="Copiar"
    />
  </Section>
)

export default ApiKeySection
