import React from 'react'
import { Flex, Layout } from 'antd'

import SiteHeader from './components/header/SiteHeader'
import SiteFooter from './components/footer/SiteFooter'
import Main from './components/main/Main'

function App() {

  return (
    <Flex gap="middle" wrap>
      <Layout className='wrapper'>
        <SiteHeader />
        <Main />
        <SiteFooter />
      </Layout>
    </Flex>
  )
}

export default App
