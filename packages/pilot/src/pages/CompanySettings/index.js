import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { compose } from 'ramda'
import { translate } from 'react-i18next'
import { connect } from 'react-redux'
import cockpit from 'cockpit'

import CompanySettings from '../../containers/Settings/Company'

const mapStateToProps = ({
  account: { client, user },
}) => ({ client, user })

const enhanced = compose(
  withRouter,
  connect(mapStateToProps),
  translate()
)

const CompanyInformation = {
  name: 'Nem Nome Tem',
  full_name: 'Nem Nome Tem',
  cnpj: '54346352000122',
  site_url: 'http://www.nemnometem.me',
}

class CompanySettingsPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      companyInfo: {
        pricing: {},
        apiKeys: [],
        team: [],
      },
    }
    this.client = cockpit(props.client)
  }

  componentWillMount () {
    this.client.company.info()
      .then((companyInfo) => {
        this.setState({ companyInfo })
      })
  }

  render () {
    const {
      t,
    } = this.props

    const {
      companyInfo: {
        pricing,
        apiKeys,
        team,
      },
    } = this.state

    return (
      <CompanySettings
        pricing={pricing}
        apiKeys={apiKeys}
        team={team}
        companyInformation={CompanyInformation}
        t={t}
      />
    )
  }
}

CompanySettingsPage.propTypes = {
  t: PropTypes.func.isRequired,
  client: PropTypes.object.isRequired, // eslint-disable-line
}

export default enhanced(CompanySettingsPage)
