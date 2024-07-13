import React from 'react'
import { Flex, Spin } from 'antd'

function Spinner() {
  const contentStyle = {
    padding: 50,
    background: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 4,
  }
  const content = <div style={contentStyle} />

  return (
    <Flex justify='center' align='center' className='main__container'>
      <Spin tip="Loading" size="large">
        {content}
      </Spin>
    </Flex>
  )
}

export default Spinner