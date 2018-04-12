import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import {
  CardTitle,
  CardSection,
  CardContent,
  CardSectionDoubleLineTitle,
} from 'former-kit'
import IconPercent from 'emblematic-icons/svg/Percent32.svg'
import CompanyInformation from './CompanyInformation'

import { title } from './style.css'

const RegisterInfoTab = ({
  t,
  companyInformation,
}) => (
  <Fragment>
    <p className={title}>{t('settings.company.card.register.cardTitle')}</p>

    <CompanyInformation
      t={t}
      companyInformation={companyInformation}
    />

    <CardContent>
      <CardSection>
        <CardSectionDoubleLineTitle
          title={t('settings.company.card.register.title.documents')}
          icon={<IconPercent height={16} width={16} />}
          subtitle={t('settings.company.card.register.subtitle.documents')}
          collapsed={false}
          // onClick={
          //   this.handleSectionTitleClick('personalInfoSectionCollapsed')
          // }
        />
      </CardSection>
    </CardContent>

    <CardTitle
      title={t('settings.company.card.register.cardDataBank')}
    />
    <CardContent>
      <CardSection>
        <CardSectionDoubleLineTitle
          title={t('settings.company.card.register.title.bank')}
          icon={<IconPercent height={16} width={16} />}
          subtitle={t('settings.company.card.register.subtitle.bank')}
          collapsed={false}
          // onClick={
          //   this.handleSectionTitleClick('personalInfoSectionCollapsed')
          // }
        />
      </CardSection>
    </CardContent>

    <CardTitle
      title={t('settings.company.card.register.cardDataBank')}
    />
    <CardContent>
      <CardSection>
        <CardSectionDoubleLineTitle
          title={t('settings.company.card.register.title.bank')}
          icon={<IconPercent height={16} width={16} />}
          subtitle={t('settings.company.card.register.subtitle.bank')}
          collapsed={false}
          // onClick={
          //   this.handleSectionTitleClick('personalInfoSectionCollapsed')
          // }
        />
      </CardSection>
    </CardContent>
  </Fragment>
)

RegisterInfoTab.propTypes = {
  t: PropTypes.func.isRequired,
  companyInformation: PropTypes.shape({
    name: PropTypes.string,
    full_name: PropTypes.string,
    cnpj: PropTypes.string,
    site_url: PropTypes.string,
  }).isRequired,
}

export default RegisterInfoTab
