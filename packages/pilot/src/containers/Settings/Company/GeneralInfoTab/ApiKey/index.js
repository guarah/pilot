import React from 'react'
import PropTypes from 'prop-types'
import {
  CardSection,
  CardContent,
  CardSectionDoubleLineTitle,
  Grid,
  Row,
  Col,
} from 'former-kit'
import IconPercent from 'emblematic-icons/svg/Percent32.svg'
import ApiKey from '../../../../../components/ApiKey'

const copyToClipBoard = (text) => {
  const textarea = document.createElement('textarea')
  textarea.textContent = text

  textarea.style.opacity = 0
  textarea.style.position = 'absolute'

  document.body.appendChild(textarea)
  textarea.select()

  document.execCommand('copy')
  document.body.removeChild(textarea)
}

class ApiKeyContainer extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      apiKeyCollapsed: true,
    }

    this.handleSectionTitleClick = this.handleSectionTitleClick.bind(this)
    this.contentRender = this.contentRender.bind(this)
  }

  handleSectionTitleClick () {
    this.setState({
      apiKeyCollapsed: !this.state.apiKeyCollapsed,
    })
  }

  contentRender () {
    const { apiKeys } = this.props

    const renderApiKey = ({ title, keys: { apiKey, encryptionKey } }) =>
      (
        <Row key={title}>
          <Col
            palm={12}
            tablet={12}
            desk={2}
            tv={2}
          >
            {title}
          </Col>
          <Col
            palm={12}
            tablet={12}
            desk={5}
            tv={5}
          >
            <ApiKey
              title="API"
              apiKey={apiKey}
              copyLabel="Copiar"
              onCopy={copyToClipBoard}
            />
          </Col>
          <Col
            palm={12}
            tablet={12}
            desk={5}
            tv={5}
          >
            <ApiKey
              title="Chave De Criptografia"
              apiKey={encryptionKey}
              copyLabel="Copiar"
              onCopy={copyToClipBoard}
            />
          </Col>
        </Row>
      )

    return (
      <CardContent>
        <Grid>
          {apiKeys.map(renderApiKey)}
        </Grid>
      </CardContent>
    )
  }

  render () {
    const { t } = this.props

    return (
      <CardContent>
        <CardSection>
          <CardSectionDoubleLineTitle
            title={t('settings.company.card.general.title.api')}
            icon={<IconPercent height={16} width={16} />}
            subtitle={t('settings.company.card.general.subtitle.api')}
            collapsed={this.state.apiKeyCollapsed}
            onClick={this.handleSectionTitleClick}
          />
          {
            !this.state.apiKeyCollapsed ?
              this.contentRender() :
              null
          }
        </CardSection>
      </CardContent>
    )
  }
}

ApiKeyContainer.propTypes = {
  t: PropTypes.func.isRequired,
  apiKeys: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      keys: PropTypes.shape({
        encryptionKey: PropTypes.string,
        apiKey: PropTypes.string,
      }),
    })
  ).isRequired,
}

export default ApiKeyContainer
