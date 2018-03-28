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
import PasswordRedefinitionForm from './passwordRedefinitionForm'
import PersonalInfoForm from './PersonalInfoForm'

class UserSettings extends Component {
  constructor (props) {
    super(props)
    this.state = {
      passwordInfoSectionCollapsed: false,
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
      handlePasswordFormSubmit,
      handlePersonalFormSubmit,
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
                title={t('settings.user.card.header')}
              />

              <CardContent>
                <CardSection>
                  <CardSectionDoubleLineTitle
                    title={t('settings.user.personal.card.title')}
                    icon={<IconInfo height={16} width={16} />}
                    subtitle={t('settings.user.personal.card.subtitle')}
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
                    title={t('settings.user.address.card.title')}
                    icon={<IconInfo height={16} width={16} />}
                    subtitle={t('settings.user.address.card.subtitle')}
                    collapsed={this.state.passwordInfoSectionCollapsed}
                    onClick={
                      this.handleSectionTitleClick('passwordInfoSectionCollapsed')
                    }
                  />
                  {
                    !this.state.passwordInfoSectionCollapsed &&
                      <PasswordRedefinitionForm
                        onSubmit={handlePasswordFormSubmit}
                        onCancel={() => console.log('canceled')}
                        t={t}
                      />
                  }
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
  handlePasswordFormSubmit: PropTypes.func.isRequired,
  handlePersonalFormSubmit: PropTypes.func.isRequired,
}

UserSettings.defaultProps = {
  t: t => t,
}

export default UserSettings
