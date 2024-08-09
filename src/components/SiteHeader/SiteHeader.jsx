import React from 'react'
import { Layout, Flex, Tabs } from 'antd'
import { Link, useLocation } from 'react-router-dom'

function SiteHeader() {
  const { Header } = Layout

  const location = useLocation()
  const activeKey = location.pathname === '/search' ? '1' : '2'

  const items = [
    {
      key: '1',
      label: <Link to='/search'>Search</Link>,
      children: ''
    },
    {
      key: '2',
      label: <Link to='/rated'>Rated</Link>,
      children: ''
    },
  ]

  return (
    <Header className='header'>
      <Flex className='header__container' justify='center' align='center'>
        <Tabs defaultActiveKey={activeKey} items={items} />
      </Flex>
    </Header>
  )
}

export default SiteHeader