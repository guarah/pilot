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
              label={t('CEP')}
              name="cep"
              type="text"
              className={styles.formInput}
            />
          </Col>
          <Col palm={12} tablet={12} desk={5} tv={5}>
            <FormInput
              label={t('Rua')}
              name="street"
              type="text"
              className={styles.formInput}
            />
          </Col>
          <Col palm={12} tablet={12} desk={2} tv={2}>
            <FormInput
              label={t('N°')}
              name="number"
              type="number"
              className={styles.formInput}
            />
          </Col>
          <Col palm={12} tablet={12} desk={3} tv={3}>
            <FormInput
              label={t('Complemento - opcional')}
              name="complement"
              type="text"
              className={styles.formInput}
            />
          </Col>
        </Row>

        <Row>
          <Col palm={12} tablet={12} desk={2} tv={2}>
            <FormInput
              label={t('Bairro')}
              name="name"
              type="text"
              className={styles.formInput}
            />
          </Col>
          <Col palm={12} tablet={12} desk={5} tv={5}>
            <FormInput
              label={t('sign_up.company')}
              name="company"
              type="text"
              className={styles.formInput}
            />
          </Col>
          <Col palm={12} tablet={12} desk={2} tv={2}>
            <FormDropdown
              options={options}
              name="company"
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
      >
        {t('CANCELAR')}
      </Button>
      <Button
        type="cancel"
        size="large"
        fill="gradient"
      >
        {t('SALVAR ALTERAÇÕES')}
      </Button>
    </CardActions>
  </Form>
)

AddressInfoForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  t: PropTypes.func,
}

AddressInfoForm.defaultProps = {
  t: t => t,
}

export default AddressInfoForm
