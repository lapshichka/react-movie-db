import React from 'react'
import { Layout, Flex } from 'antd'

function SiteFooter() {
  const { Footer } = Layout

  return (
    <Footer className='footer'>
      <Flex className='footer__container'>
        Build with ...
      </Flex>
    </Footer>
  )
}

export default SiteFooter