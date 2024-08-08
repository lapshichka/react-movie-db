import React, { Children } from 'react'
import { Layout, Flex, Tabs } from 'antd'

function SiteHeader() {
  const { Header } = Layout

  const items = [
    {
      key: '1',
      label: 'Search',
      children: ''
    },
    {
      key: '2',
      label: 'Rated',
      children: ''
    },
  ]

  return (
    <Header className='header'>
      <Flex className='header__container' justify='center' align='center'>
        <Tabs defaultActiveKey="1" items={items} />
      </Flex>
    </Header>
  )
}

export default SiteHeader