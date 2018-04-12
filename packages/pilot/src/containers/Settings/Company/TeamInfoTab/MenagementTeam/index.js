import React from 'react'
import PropTypes from 'prop-types'
import {
  Grid,
  Row,
  Col,
  CardSection,
  CardContent,
  CardSectionDoubleLineTitle,
  Button,
} from 'former-kit'
import IconTeam from 'emblematic-icons/svg/Sellers32.svg'
import IconAdd from 'emblematic-icons/svg/Add24.svg'
import TableUser from './TableUser'
import style from './style.css'

class MenagementTeam extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      collapsed: false,
    }

    this.handleSectionTitleClick = this.handleSectionTitleClick.bind(this)
    this.contentRender = this.contentRender.bind(this)
  }

  handleSectionTitleClick () {
    this.setState({
      collapsed: !this.state.collapsed,
    })
  }

  contentRender () {
    const {
      t,
      team,
    } = this.props
    return (
      <CardContent>
        <Grid>
          <Row>
            <Col palm={12} tablet={12} desk={12} tv={12} className={style.containerHeaderTable}>
              <Button
                disabled
                relevance="high"
                icon={<IconAdd width={12} height={12} />}
              > Novo Usuário
              </Button>
              <p className={style.containerHeaderTableCount}>{team.length} usuários</p>
            </Col>
          </Row>
          <Row>
            <Col palm={12} tablet={12} desk={12} tv={12}>
              <TableUser
                t={t}
                team={team}
              />
            </Col>
          </Row>
        </Grid>
      </CardContent>
    )
  }

  render () {
    const {
      t,
    } = this.props

    return (
      <CardContent>
        <CardSection>
          <CardSectionDoubleLineTitle
            title={t('settings.company.card.team.title.management')}
            icon={<IconTeam height={16} width={16} />}
            subtitle={t('settings.company.card.team.subtitle.management')}
            collapsed={this.state.collapsed}
            onClick={
              this.handleSectionTitleClick
            }
          />
          {
            this.state.collapsed ?
              this.contentRender() :
              null
          }
        </CardSection>
      </CardContent>
    )
  }
}

MenagementTeam.propTypes = {
  t: PropTypes.func.isRequired,
  team: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    role: PropTypes.string,
    email: PropTypes.string,
    date_created: PropTypes.string,
  })).isRequired,
}

export default MenagementTeam
