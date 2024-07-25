import React from 'react'
import { Layout, Flex } from 'antd'

function SiteHeader() {
  const { Header } = Layout

  return (
    <Header className='header'>
      <Flex className='header__container'>
        Header
      </Flex>
    </Header>
  )
}

export default SiteHeader