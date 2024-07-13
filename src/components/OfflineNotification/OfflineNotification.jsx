import React from 'react'
import { Flex, Alert } from 'antd'

function OfflineNotification() {
  return (
    <Flex vertical justify='center' align='center' className='main__container'>
    <Alert
      message="Slow or no internet connection"
      description="Please check your internet settings and try again"
      type="info"
      showIcon
    />
  </Flex>
  )
}

export default OfflineNotification