import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import {
  compose,
} from 'ramda'
import { translate } from 'react-i18next'
import { connect } from 'react-redux'
import cockpit from 'cockpit'

import UserSettings from '../../containers/Settings/User'

const mapStateToProps = ({
  account: { client },
}) => ({ client })


const enhanced = compose(
  withRouter,
  connect(mapStateToProps),
  translate()
)

class UserSettingsPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = null
    this.client = cockpit(props.client)
    this.handleRedefinePassword = this.handleRedefinePassword.bind(this)
  }

  handleRedefinePassword (data) {
    console.log(data)
    console.log(this.client)
    this.client
      .user.updatePassword(data)
      .then(response => console.dir(response))
      .catch(error => console.dir(error))
  }

  render () {
    const {
      t,
    } = this.props

    return (
      <UserSettings
        handlePasswordFormSubmit={this.handleRedefinePassword}
        t={t}
      />
    )
  }
}

UserSettingsPage.propTypes = {
  client: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

export default enhanced(UserSettingsPage)
