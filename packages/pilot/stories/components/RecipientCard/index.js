import React from 'react'

import Section from '../Section'
import RecipientCard from '../../../src/components/RecipientCard'

const RecipientCardState = () => (
  <Section>
    <RecipientCard
      liabilities={['Chargeback', 'MDR']}
      liabilitiesLabel="Responsável por"
      name="Loja do joão"
      netAmount={999}
      netAmountLabel="TOTAL LÍQUIDO(R$)"
      outAmountLabel="TOTAL DE SAÍDAS(R$)"
      status="chargedback"
      statusLabel="Status da parcela"
      totalAmount={100000000}
      totalLabel="TOTAL BRUTO(R$)"
    />
  </Section>
)

export default RecipientCardState
