import React, {useRef} from 'react'
import "./card.scss"
import { Flex, Card, Image, Typography } from "antd"
import { format } from "date-fns"
import PropTypes from 'prop-types'

function Cards({data}) {
  const { Title, Paragraph, Text, Link } = Typography

  return (
    <>
      {data.map(({ id, posterPath, releaseDate, title, overview }) => (
        <Card hoverable key={id} className='card'>
          <Flex gap="middle">
            <Image
              className='cover'
              src={`https://media.themoviedb.org/t/p/w220_and_h330_face${posterPath}`}
              width={150}
              height={200}
              preview={false}
            />
            
            <Flex vertical className='text-content' >
              <Title level={5}>{title}</Title>
              <Paragraph className='opening'>
                {releaseDate !== '' ? format(new Date(releaseDate), 'MMMM dd, yyyy') : null }
              </Paragraph>
              <Flex gap="small">
                <Paragraph className='genre'>Action</Paragraph>
                <Paragraph className='genre'>Drama</Paragraph>
              </Flex>
              <Paragraph>
                <Text disabled={overview === ''} className='description'>
                  {overview !== '' ? overview : 'No description'}
                </Text>
              </Paragraph>
            </Flex>
          </Flex>
        </Card>
      ))}
    </>
  )
}
Cards.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      posterPath: PropTypes.string.isRequired,
      releaseDate: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      overview: PropTypes.string.isRequired,
    })
  )
}
Cards.defaultProps = {
  data: []
}
export default Cards