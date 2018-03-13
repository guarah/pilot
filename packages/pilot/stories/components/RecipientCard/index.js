import React from 'react'

import Section from '../Section'
import RecipientCard from '../../../src/components/RecipientCard'

const RecipientCardState = () => (
  <Section>
    <RecipientCard
      name="Loja do joão"
      liabilities={['Chargeback', 'MDR']}
      status="chargedback"
      totalAmount={100000000}
      netAmount={999}
    />
  </Section>
)

export default RecipientCardState
