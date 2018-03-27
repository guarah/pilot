import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import {
  compose,
} from 'ramda'
import { translate } from 'react-i18next'


import UserSettings from '../../containers/Settings/User'

const enhanced = compose(
  withRouter,
  translate()
)

class UserSettingsPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = null
  }

  render () {
    return (
      <UserSettings />
    )
  }
}

UserSettings.propTypes = {
  t: PropTypes.func.isRequired,
}

export default enhanced(UserSettingsPage)
