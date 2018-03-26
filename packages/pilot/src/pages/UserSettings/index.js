import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import {
  compose,
} from 'ramda'
import { translate } from 'react-i18next'


import UserSettings from '../../containers/Account/UserSettings'

const enhanced = compose(
  withRouter,
  translate()
)

class UserSettingsPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = null

    this.handleAddressFormSubmit.bind(this)
    this.handlePersonalFormSubmit.bind(this)
  }

  handlePersonalFormSubmit (data) {

  }

  handleAddressFormSubmit (data) {

  }

  render () {
    return (
      <UserSettings 
        handlePersonalFormSubmit={this.handlePersonalFormSubmit}
        handleAddressFormSubmit={this.handleAddressFormSubmit}
      />
    )
  }
}

UserSettings.propTypes = {
  t: PropTypes.func.isRequired,
}

export default enhanced(UserSettingsPage)
