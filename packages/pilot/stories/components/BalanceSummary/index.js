import React from 'react'
import Section from '../../Section'
import BalanceSummary from '../../../src/components/BalanceSummary'

const BalanceSummaryExample = () => (
  <Section>
    <BalanceSummary
      amount={{
        net: 1000000,
        outcoming: 1400000,
        outgoing: -400000,
      }}
      dates={{
        end: new Date(),
        start: new Date(),
      }}
    />
  </Section>
)

export default BalanceSummaryExample
