import React from 'react'
import { Flex, Layout } from 'antd'

import SiteHeader from './components/SiteHeader/SiteHeader'
import SiteFooter from './components/SiteFooter/SiteFooter'
import Main from './components/Main/Main'

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
