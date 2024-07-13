import React from "react"
import { Flex, Alert } from 'antd'
import PropTypes from 'prop-types'

function ErrorIndicator({errorText}) {
  const {name, message} = errorText

  return (
    <Flex justify='center' align='flex-start' className='main__container'>
      <Alert
        message={name}
        description={message}
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