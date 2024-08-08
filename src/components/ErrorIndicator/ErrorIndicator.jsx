import React from "react"
import { Flex, Alert } from 'antd'
import PropTypes from 'prop-types'

function ErrorIndicator({errorText}) {
  const {name, message} = errorText
  let mes = ''

  if (message === 'Failed to fetch') {
    mes = 'Turn on the VPN'
  }

  return (
    <Flex align='center' justify="flex-start" className='main__container'>
      <Alert
        message={mes && mes || name}
        description={mes && ' ' || message}
        type="error"
        showIcon
      />
    </Flex>
  )
}
ErrorIndicator.propTypes = {
  errorText: PropTypes.string.isRequired,
}

export default ErrorIndicator