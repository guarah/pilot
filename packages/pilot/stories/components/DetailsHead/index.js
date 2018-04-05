import React from 'react'

import IconReprocess from 'emblematic-icons/svg/Reprocess24.svg'
import IconReverse from 'emblematic-icons/svg/Reverse24.svg'
import IconDownload from 'emblematic-icons/svg/Download24.svg'

import { Legend } from 'former-kit'
import { action } from '@storybook/addon-actions'

import Section from '../../Section'
import DetailsHead from '../../../src/components/DetailsHead'

const DetailsHeadExample = () => (
  <Section>
    <DetailsHead
      title="Transação"
      identifier="#1234567"
      properties={[
        {
          title: 'Status',
          children: <Legend color="#53be76" acronym="Paga" />,
        },
        {
          title: 'Pagamento',
          children: 'À vista',
        },
        {
          title: 'Valor emitido',
          children: 'R$ 6,70',
        },
      ]}
      actions={[
        { title: 'Reprocessar', icon: <IconReprocess width={12} height={12} />, onClick: action('reprocessar') },
        { title: 'Estornar', icon: <IconReverse width={12} height={12} />, onClick: action('extornar') },
        { title: 'Exportar', icon: <IconDownload width={12} height={12} />, onClick: action('exportar') },
      ]}
    />
  </Section>
)

export default DetailsHeadExample
