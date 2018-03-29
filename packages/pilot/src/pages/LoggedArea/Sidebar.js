import React from 'react'
import PropTypes from 'prop-types'

import { withRouter } from 'react-router-dom'

import Sidebar from '../../containers/Sidebar'

import routes from './routes'

class SidebarContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      collapsed: false,
    }

    this.handleToggleSidebar = this.handleToggleSidebar.bind(this)
  }

  handleToggleSidebar () {
    const { collapsed } = this.state
    this.setState({ collapsed: !collapsed })
  }

  renderSubMenu (parentPath, subRoute) {
    const { collapsed } = this.state
    const { location: { pathname }, history } = this.props

    return (subRoute && subRoute.length > 0) ? subRoute.map(({ title, path }) => (
      <SidebarLink
        key={`${parentPath}${path}`}
        title={title}
        active={`${parentPath}${path}` === pathname}
        collapsed={collapsed}
        onClick={() => history.push(`${parentPath}${path}`)}
      />
    )) : null
  }

  render () {
    const { collapsed } = this.state
    const { location: { pathname }, history } = this.props

    return (
      <Sidebar collapsed={collapsed}>
        <SidebarHeader>
          {!collapsed &&
            <h1>FormerKit</h1>
          }
          <button onClick={this.handleToggleSidebar}>
            <Menu32 width={16} height={16} />
          </button>
        </SidebarHeader>

        <SidebarLinks>
          {Object.values(routes).map(({
            title,
            path,
            icon: Icon,
            subRoute,
          }) => (
            <SidebarLink
              key={path}
              title={title}
              active={path === pathname}
              icon={<Icon width={16} height={16} />}
              collapsed={collapsed}
              onClick={() => history.push(path)}
            >
              {this.renderSubMenu(path, subRoute)}
            </SidebarLink>
          ))}
        </SidebarLinks>
      </Sidebar>
    )
  }
}

SidebarContainer.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  t: PropTypes.func.isRequired,
}

export default withRouter(SidebarState)
