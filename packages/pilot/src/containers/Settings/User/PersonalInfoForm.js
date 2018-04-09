import React from 'react'
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
} from 'former-kit'

import styles from './style.css'

const PersonalInfoForm = ({
  onSubmit,
  onCancel,
  t,
}) => (
  <Form
    data={{
      email: '',
      name: '',
      company: '',
      password: '',
    }}
    onSubmit={onSubmit}
  >
    <CardContent>
      <Grid>
        <Row>
          <Col palm={12} tablet={12} desk={4} tv={4}>
            <FormInput
              label={t('settings.user.personal.name')}
              name="name"
              type="text"
              className={styles.formInput}
            />
          </Col>
          <Col palm={12} tablet={12} desk={4} tv={4}>
            <FormInput
              label={t('settings.user.personal.email')}
              name="email"
              type="text"
              className={styles.formInput}
            />
          </Col>
          <Col palm={12} tablet={12} desk={4} tv={4}>
            <FormInput
              label={t('settings.user.personal.mothername')}
              name="mothername"
              type="text"
              className={styles.formInput}
            />
          </Col>
        </Row>

        <Row>
          <Col palm={12} tablet={12} desk={2} tv={2}>
            <FormInput
              label={t('settings.user.personal.document')}
              name="document"
              type="text"
              className={styles.formInput}
            />
          </Col>
          <Col palm={12} tablet={12} desk={4} tv={4}>
            <FormInput
              label={t('settings.user.personal.birthday')}
              name="birthday"
              type="text"
              className={styles.formInput}
            />
          </Col>
          <Col palm={12} tablet={12} desk={2} tv={2}>
            <FormInput
              label={t('settings.user.personal.cpf')}
              name="cpf"
              type="text"
              className={styles.formInput}
            />
          </Col>
          <Col palm={12} tablet={12} desk={2} tv={2}>
            <FormInput
              label={t('settings.user.personal.phone')}
              name="phone"
              type="text"
              className={styles.formInput}
            />
          </Col>
        </Row>
      </Grid>
    </CardContent>
    <CardActions>
      <Button
        type="reset"
        size="large"
        fill="outline"
        onClick={onCancel}
      >
        {t('settings.user.personal.button.cancel')}
      </Button>
      <Button
        type="submit"
        size="large"
        fill="gradient"
      >
        {t('settings.user.personal.button.save')}
      </Button>
    </CardActions>
  </Form>
)

PersonalInfoForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  t: PropTypes.func,
}

PersonalInfoForm.defaultProps = {
  t: t => t,
}

export default PersonalInfoForm
