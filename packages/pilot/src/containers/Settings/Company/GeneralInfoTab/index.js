import React from 'react'
import {
  Grid,
  Row,
  Col,
  Card,
  CardTitle,
  CardSection,
  CardContent,
  CardSectionDoubleLineTitle,
} from 'former-kit'
import IconPercent from 'emblematic-icons/svg/Percent32.svg'

const GeneralInfoTab = () => (
  <Grid>
    <Row>
      <Col
        palm={12}
        tablet={12}
        desk={12}
        tv={12}
      >
        <Card>
          <CardTitle />
          <CardContent>
            <CardSection>
              <CardSectionDoubleLineTitle
                title="Taxa de Servicos"
                icon={<IconPercent height={16} width={16} />}
                subtitle="Taxas e servicos negociados durante a ativacao da sua conta."
                collapsed={false}
                // onClick={
                //   this.handleSectionTitleClick('personalInfoSectionCollapsed')
                // }
              />
            </CardSection>
          </CardContent>
        </Card>
      </Col>
    </Row>
  </Grid>
)

export default GeneralInfoTab
