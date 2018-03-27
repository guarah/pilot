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

const PasswordRedefinitionForm = ({
  onSubmit,
  onCancel,
  t,
}) => (
  <Form
    data={{
      current_password: '',
      new_password: '',
    }}
    onSubmit={onSubmit}
  >
    <CardContent>
      <Grid>
        <Row>
          <Col palm={12} tablet={12} desk={3} tv={3}>
            <FormInput
              label={t('account.passwordform.currentpassword')}
              name="current_password"
              type="text"
              className={styles.formInput}
            />
          </Col>
          <Col palm={12} tablet={12} desk={3} tv={3}>
            <FormInput
              label={t('account.passwordform.currentpassword')}
              name="current_password"
              type="text"
              className={styles.formInput}
            />
          </Col>
          <Col palm={12} tablet={12} desk={3} tv={3}>
            <FormInput
              label={t('account.passwordform.new_password')}
              name="new_password"
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
        {t('account.passwordform.cancel')}
      </Button>
      <Button
        type="submit"
        size="large"
        fill="gradient"
      >
        {t('account.passwordform.save')}
      </Button>
    </CardActions>
  </Form>
)

PasswordRedefinitionForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  t: PropTypes.func,
}

PasswordRedefinitionForm.defaultProps = {
  t: t => t,
}

export default PasswordRedefinitionForm
