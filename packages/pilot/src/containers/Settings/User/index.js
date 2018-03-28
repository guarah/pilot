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
                    title={t('settings.user.access.card.title')}
                    icon={<IconInfo height={16} width={16} />}
                    subtitle={t('settings.user.access.card.subtitle')}
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
}

UserSettings.defaultProps = {
  t: t => t,
}

export default UserSettings
