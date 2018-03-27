import React, { Component } from 'react'
import {
  TabBar,
  TabItem,
} from 'former-kit'

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
    return (
      <TabBar
        variant="just-text"
        selected={this.state.selected}
        onTabChange={this.changeTab}
      >
        <TabItem text="Geral">
          <h2>Geral</h2>
        </TabItem>
        <TabItem text="Produtos" >
          <h2>Produtos</h2>
        </TabItem>
        <TabItem text="Personalização">
          <h2>Personalizacao</h2>
        </TabItem>
        <TabItem text="Cadastro">
          <h2>Cadastro</h2>
        </TabItem>
      </TabBar>
    )
  }
}

export default CompanySettings
