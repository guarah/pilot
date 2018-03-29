import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Grid,
  Row,
  Col,
  Card,
  CardContent,
  TabBar,
  TabItem,
} from 'former-kit'

import GeneralInfoTab from './GeneralInfoTab'
import ProductInfoTab from './ProductInfoTab'
import TeamInfoTab from './TeamInfoTab'
import RegisterInfoTab from './RegisterInfoTab'

class CompanySettings extends Component {
  constructor (props) {
    super(props)
    this.state = { selected: 1 }
    this.changeTab = this.changeTab.bind(this)
  }

  changeTab (selected) {
    this.setState({ selected })
  }

  render () {
    const {
      t,
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
              <CardContent>
                <TabBar
                  variant="just-text"
                  selected={this.state.selected}
                  onTabChange={this.changeTab}
                >
                  <TabItem text={t('settings.tab.general')}>
                    <GeneralInfoTab
                      t={t}
                    />
                  </TabItem>
                  <TabItem text={t('settings.tab.product')}>
                    <ProductInfoTab
                      t={t}
                    />
                  </TabItem>
                  <TabItem text={t('settings.tab.team')}>
                    <TeamInfoTab
                      t={t}
                    />
                  </TabItem>
                  <TabItem text={t('settings.tab.register')}>
                    <RegisterInfoTab
                      t={t}
                    />
                  </TabItem>
                </TabBar>
              </CardContent>
            </Card>
          </Col>
        </Row>
      </Grid>
    )
  }
}

CompanySettings.propTypes = {
  t: PropTypes.func,
}

CompanySettings.defaultProps = {
  t: t => t,
}

export default CompanySettings