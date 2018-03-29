import React from 'react'
import PropTypes from 'prop-types'
import {
  Redirect,
  Route,
  Switch,
  withRouter,
} from 'react-router-dom'
import { translate } from 'react-i18next'
import { compose } from 'ramda'
import { Layout } from 'former-kit'

import Sidebar from './Sidebar'
import Header from './Header'

import routes from './routes'

const subRoutes = (parentPath, subRoute) => (
  <Switch>
    {subRoute.map(({ path, component }) => (
      <Route
        component={component}
        key={`${parentPath}${path}`}
        path={`${parentPath}${path}`}
      />
    ))}
  </Switch>
)

const LoggedArea = () => (
  <Layout
    sidebar={<Sidebar t={t} />}
    header={<Header t={t} />}
  >
    <Switch>
      {Object.values(routes).map(({
          component,
          path,
          subRoute,
        }) => (
          (subRoute && subRoute.length > 0) ?
          subRoutes(path, subRoute) :
          <Route
            key={path}
            path={path}
            component={component}
          />
        )
      )}
      <Redirect to={routes.transactions.path} />
    </Switch>
  </Layout>
)

LoggedArea.propTypes = {
  t: PropTypes.func.isRequired,
}

export default enhanced(LoggedArea)
