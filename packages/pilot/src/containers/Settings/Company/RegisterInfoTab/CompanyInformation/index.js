import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import {
  CardContent,
  CardTitle,
  CardSection,
  CardSectionDoubleLineTitle,
} from 'former-kit'

import IconPercent from 'emblematic-icons/svg/Percent32.svg'


class CompanyInformation extends React.Component {
  constructor (props) {
    super(props)

    this.handleSectionTitleClick = this.handleSectionTitleClick.bind(this)

    this.state = {
      collapsed: false,
    }
  }

  handleSectionTitleClick () {
    this.setState({
      collapsed: !this.state.collapsed,
    })
  }

  contentRender () {
    const {
      companyInformation,
    } = this.props

    return (<h1>{companyInformation.name}</h1>)
  }

  render () {
    const {
      t,
    } = this.props

    return (
      <Fragment>
        <CardTitle
          title={t('settings.company.card.register.cardCompany')}
        />
        <CardContent>
          <CardSection>
            <CardSectionDoubleLineTitle
              title={t('settings.company.card.register.title.company')}
              icon={<IconPercent height={16} width={16} />}
              subtitle={t('settings.company.card.register.subtitle.company')}
              collapsed={this.state.collapsed}
              onClick={this.handleSectionTitleClick}
            />
            {
              this.state.collapsed ?
                this.contentRender() :
                null
            }
          </CardSection>
        </CardContent>
      </Fragment>
    )
  }
}

CompanyInformation.propTypes = {
  t: PropTypes.func.isRequired,
  companyInformation: PropTypes.shape({
    name: PropTypes.string,
    full_name: PropTypes.string,
    cnpj: PropTypes.string,
    site_url: PropTypes.string,
  }).isRequired,
}

export default CompanyInformation
