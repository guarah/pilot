import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'former-kit'
import IconCopy from 'emblematic-icons/svg/Copy24.svg'

import styles from './style.css'

const ApiKey = ({
  title,
  apiKey,
  onCopy,
  copyLabel,
}) => (
  <div>
    <div className={styles.title}>
      <h4>{title}</h4>
      <Button
        fill="clean"
        size="tiny"
        icon={<IconCopy width="12px" height="12px" />}
        onClick={() => onCopy(apiKey)}
      >
        { copyLabel }
      </Button>
    </div>
    <div className={styles.content}>
      { apiKey }
    </div>
  </div>
)

ApiKey.propTypes = {
  title: PropTypes.string.isRequired,
  apiKey: PropTypes.string.isRequired,
  onCopy: PropTypes.func.isRequired,
  copyLabel: PropTypes.string.isRequired,
}

export default ApiKey
