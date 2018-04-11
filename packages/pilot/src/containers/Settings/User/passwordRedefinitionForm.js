import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Form from 'react-vanilla-form'
import {
  Button,
  FormInput,
  Grid,
  Row,
  Col,
  CardActions,
  CardContent,
  Alert,
} from 'former-kit'
import {
  isEmpty,
  equals,
} from 'ramda'
import IconWarning from 'emblematic-icons/svg/Warning32.svg'
import IconInfo from 'emblematic-icons/svg/Info32.svg'
import styles from './style.css'

const required = t => value => (value ? false : t('settings.user.card.access.fieldRequired'))
const areStringsEqual = t => str1 => str2 => (equals(str1, str2) ? false : t('settings.user.card.access.passwordEqual'))

class PasswordRedefinitionForm extends Component {
  constructor (props) {
    super(props)

    const initalFormData = {
      current_password: '',
      new_password: '',
      new_password_confirmation: '',
    }

    this.state = {
      initalFormData,
      currentFormData: initalFormData,
    }

    this.handleCancellation = this.handleCancellation.bind(this)
    this.handleFormChange = this.handleFormChange.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    const { status: { success } } = nextProps

    if (success) {
      this.setState({
        currentFormData: this.state.initalFormData,
      })
    }
  }

  handleFormChange (data) {
    this.setState({
      currentFormData: data,
    })
  }

  handleCancellation () {
    this.setState({
      currentFormData: this.state.initalFormData,
    })
  }

  handleFormSubmit (data, formErrors) {
    if (isEmpty(formErrors)) {
      this.props.onSubmit(data)
    }
  }
  render () {
    const {
      t,
      status,
    } = this.props

    const {
      currentFormData: {
        new_password,
      },
    } = this.state

    return (
      <Form
        data={this.state.currentFormData}
        onSubmit={this.handleFormSubmit}
        onChange={this.handleFormChange}
        customErrorProp="error"
        validation={
          {
            current_password: required(t),
            new_password: [required(t)],
            new_password_confirmation: [
              required(t),
              areStringsEqual(t)(new_password),
            ],
          }
        }
      >
        <CardContent>
          <Grid>
            <Row>
              <Col palm={12} tablet={12} desk={3} tv={3}>
                <FormInput
                  label={t('settings.user.card.access.currentPassword')}
                  name="current_password"
                  type="password"
                  className={styles.formInput}
                />
              </Col>
              <Col palm={12} tablet={12} desk={3} tv={3}>
                <FormInput
                  label={t('settings.user.card.access.newPassword')}
                  name="new_password"
                  type="password"
                  className={styles.formInput}
                />
              </Col>
              <Col palm={12} tablet={12} desk={3} tv={3}>
                <FormInput
                  label={t('settings.user.card.access.matchNewPassword')}
                  name="new_password_confirmation"
                  type="password"
                  className={styles.formInput}
                />
              </Col>
            </Row>
            <Row>
              <Col palm={12} tablet={12} desk={12} tv={12}>
                <div className={styles.errorAlert}>
                  { status.error &&
                    <Alert
                      type="error"
                      icon={<IconWarning height={16} width={16} />}
                    >
                      <p>{status.error}</p>
                    </Alert>
                  }
                  { status.success &&
                    <Alert
                      type="info"
                      icon={<IconInfo height={16} width={16} />}
                    >
                      <p>{t('settings.user.card.access.alert.success')}</p>
                    </Alert>
                  }
                </div>
              </Col>
            </Row>
          </Grid>
        </CardContent>
        <CardActions>
          <Button
            type="reset"
            fill="outline"
            size="tiny"
            onClick={this.handleCancellation}
          >
            {t('settings.user.card.access.buttonCancel')}
          </Button>
          <Button
            type="submit"
            size="tiny"
            fill="gradient"
          >
            {t('settings.user.card.access.buttonSubmit')}
          </Button>
        </CardActions>
      </Form>
    )
  }
}

PasswordRedefinitionForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  status: PropTypes.shape({
    error: PropTypes.string,
    success: PropTypes.bool,
  }).isRequired,
  t: PropTypes.func,
}

PasswordRedefinitionForm.defaultProps = {
  t: t => t,
}

export default PasswordRedefinitionForm
