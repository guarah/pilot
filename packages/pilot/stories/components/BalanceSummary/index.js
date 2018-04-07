import React from 'react'
import Section from '../../Section'
import BalanceSummary from '../../../src/components/BalanceSummary'

const amount = {
  outcoming: {
    title: 'Total de entradas',
    value: 1400000,
    unity: 'R$',
  },
  outgoing: {
    title: 'Total de Saídas',
    value: -400000,
    unity: 'R$',
  },
  net: {
    title: 'Total Líquido',
    value: 1000000,
    unity: 'R$',
  },
}

const BalanceSummaryExample = () => (
  <Section>
    <BalanceSummary
      amount={amount}
      dates={{
        end: new Date(),
        start: new Date(),
      }}
    />
  </Section>
)

export default BalanceSummaryExample
