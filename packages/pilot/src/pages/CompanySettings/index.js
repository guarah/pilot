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

const Team = [
  {
    name: 'Geisson Machado',
    role: 'admin',
    email: 'geisonnm@hotmail.com',
    date_created: '2018-02-27T21:06:00.669Z',
  },
  {
    name: 'Pedro Adas',
    role: 'ready_only',
    email: 'pedro.adas@hotmail.com',
    date_created: '2018-02-27T21:06:00.669Z',
  },
  {
    name: 'Vitor Lima',
    role: 'admin',
    email: 'vitor.lime@hotmail.com',
    date_created: '2018-02-27T21:06:00.669Z',
  },
  {
    name: 'Vinicius',
    role: 'ready_only',
    email: 'vinirock@hotmail.com',
    date_created: '2018-02-27T21:06:00.669Z',
  },
]

const enhanced = compose(
  withRouter,
  connect(mapStateToProps),
  translate()
)

class CompanySettingsPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      companyInfo: {
        pricing: {},
        apiKeys: [],
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
      },
    } = this.state
    console.log(this.state.companyInfo)

    return (
      <CompanySettings
        pricing={pricing}
        apiKeys={apiKeys}
        team={Team}
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
