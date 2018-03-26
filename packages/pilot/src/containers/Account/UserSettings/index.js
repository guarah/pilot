import React, { Component } from 'react'
import PropTypes from 'prop-types'
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
import IconInfo from 'emblematic-icons/svg/Info32.svg'
import PersonalInfoForm from './PersonalInfoForm'
import AddressInfoForm from './AddressInfoForm'


class UserSettings extends Component {
  constructor (props) {
    super(props)
    this.state = {
      companyInfoSectionCollapsed: false,
      personalInfoSectionCollapsed: false,
      addressInfoSectionCollapsed: false,
    }
  }

  handleSectionTitleClick (cardSectionStateProp) {
    return () => {
      const currentCollapseState = this.state[cardSectionStateProp]

      this.setState({
        [cardSectionStateProp]: !currentCollapseState,
      })
    }
  }
  render () {
    const {
      t,
      handlePersonalFormSubmit,
      handleAddressFormSubmit,
    } = this.props

    return (
      <Grid>
        <Row>
          <Col
            palm={12}
            tablet={12}
            desk={12}
            tv={12}
          >
            <Card>
              <CardTitle
                title="Dados Pessoais"
              />

              <CardContent>
                <CardSection>
                  <CardSectionDoubleLineTitle
                    title="Informacoes da empresa"
                    icon={<IconInfo height={16} width={16} />}
                    subtitle="Verifique ou edite informacoes de sua empresa"
                    collapsed={this.state.personalInfoSectionCollapsed}
                    onClick={
                      this.handleSectionTitleClick('personalInfoSectionCollapsed')
                    }
                  />
                  {
                    !this.state.personalInfoSectionCollapsed &&
                      <PersonalInfoForm
                        t={t}
                        onSubmit={handlePersonalFormSubmit}
                        onCancel={() => console.log('canceled')}
                      />
                  }
                </CardSection>

              </CardContent>

              <CardContent>
                <CardSection>
                  <CardSectionDoubleLineTitle
                    title="Endereço residencial"
                    icon={<IconInfo height={16} width={16} />}
                    subtitle="Verifique ou edite informações no Pagar.me"
                    collapsed={this.state.addressInfoSectionCollapsed}
                    onClick={
                      this.handleSectionTitleClick('addressInfoSectionCollapsed')
                    }
                  />
                  {
                    !this.state.addressInfoSectionCollapsed &&
                      <AddressInfoForm
                        onSubmit={handleAddressFormSubmit}
                        onCancel={() => console.log('canceled')}
                      />
                  }
                </CardSection>
              </CardContent>
            </Card>

            <Card>
              <CardTitle
                title="Acesso"
              />

              <CardContent>
                <CardSection
                  collapsed={this.state.companySectionCollapsed}
                  title="Alterar senha"
                  subtitle="Recomendamos que use uma senha forte e
                diferente das demais que costuma utilizar"
                  onTitleClick={this.handleSectionTitleClick('companySectionCollapsed')}
                  icon={<IconInfo height={16} width={16} />}
                >
                  {'dasdadas'}
                </CardSection>
              </CardContent>
            </Card>
          </Col>
        </Row>
      </Grid>
    )
  }
}

UserSettings.propTypes = {
  t: PropTypes.func,
  handlePersonalFormSubmit: PropTypes.func.isRequired,
  handleAddressFormSubmit: PropTypes.func.isRequired,
}

UserSettings.defaultProps = {
  t: t => t,
}

export default UserSettings
