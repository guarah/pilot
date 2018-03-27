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
              label={t('account.personalinfo.name')}
              name="name"
              type="text"
              className={styles.formInput}
            />
          </Col>
          <Col palm={12} tablet={12} desk={4} tv={4}>
            <FormInput
              label={t('account.personalinfo.email')}
              name="company"
              type="text"
              className={styles.formInput}
            />
          </Col>
          <Col palm={12} tablet={12} desk={4} tv={4}>
            <FormInput
              label={t('account.personalinfo.mothername')}
              name="email"
              type="text"
              className={styles.formInput}
            />
          </Col>
        </Row>

        <Row>
          <Col palm={12} tablet={12} desk={2} tv={2}>
            <FormInput
              label={t('sign_up.company')}
              name="company"
              type="text"
              className={styles.formInput}
            />
          </Col>
          <Col palm={12} tablet={12} desk={4} tv={4}>
            <FormInput
              label={t('account.personalinfo.birthday')}
              name="name"
              type="text"
              className={styles.formInput}
            />
          </Col>
          <Col palm={12} tablet={12} desk={2} tv={2}>
            <FormInput
              label={t('account.personalinfo.cpf')}
              name="company"
              type="text"
              className={styles.formInput}
            />
          </Col>
          <Col palm={12} tablet={12} desk={2} tv={2}>
            <FormInput
              label={t('account.personalinfo.phone')}
              name="company"
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
        {t('account.personalinfo.cancel')}
      </Button>
      <Button
        type="submit"
        size="large"
        fill="gradient"
      >
        {t('account.personalinfo.save')}
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
