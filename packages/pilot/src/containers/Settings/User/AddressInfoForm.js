import React from 'react'
import PropTypes from 'prop-types'
import Form from 'react-vanilla-form'
import {
  Button,
  FormInput,
  FormDropdown,
  Grid,
  Row,
  Col,
  CardActions,
  CardContent,
} from 'former-kit'

import styles from './style.css'

const options = [
  {
    name: 'Github',
    value: 'github',
  },
  {
    name: 'Open Source',
    value: 'open-source',
  },
  {
    name: 'Pilot',
    value: 'pilot',
  },
]

const AddressInfoForm = ({
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
          <Col palm={12} tablet={12} desk={2} tv={2}>
            <FormInput
              label={t('settings.user.address.cep')}
              name="cep"
              type="text"
              className={styles.formInput}
            />
          </Col>
          <Col palm={12} tablet={12} desk={5} tv={5}>
            <FormInput
              label={t('settings.user.address.street')}
              name="street"
              type="text"
              className={styles.formInput}
            />
          </Col>
          <Col palm={12} tablet={12} desk={2} tv={2}>
            <FormInput
              label={t('settings.user.address.number')}
              name="number"
              type="number"
              className={styles.formInput}
            />
          </Col>
          <Col palm={12} tablet={12} desk={3} tv={3}>
            <FormInput
              label={t('settings.user.address.complement')}
              name="complement"
              type="text"
              className={styles.formInput}
            />
          </Col>
        </Row>

        <Row>
          <Col palm={12} tablet={12} desk={2} tv={2}>
            <FormInput
              label={t('settings.user.address.neighborhood')}
              name="neighborhood"
              type="text"
              className={styles.formInput}
            />
          </Col>
          <Col palm={12} tablet={12} desk={5} tv={5}>
            <FormInput
              label={t('settings.user.address.city')}
              name="city"
              type="text"
              className={styles.formInput}
            />
          </Col>
          <Col palm={12} tablet={12} desk={2} tv={2}>
            <FormDropdown
              options={options}
              name="state"
            />
          </Col>
        </Row>
      </Grid>
    </CardContent>
    <CardActions>
      <Button
        type="submit"
        size="large"
        fill="outline"
        onClick={onCancel}
      >
        {t('settings.user.address.button.cancel')}
      </Button>
      <Button
        type="submit"
        size="large"
        fill="gradient"
      >
        {t('settings.user.address.button.save')}
      </Button>
    </CardActions>
  </Form>
)

AddressInfoForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  t: PropTypes.func,
}

AddressInfoForm.defaultProps = {
  t: t => t,
}

export default AddressInfoForm
