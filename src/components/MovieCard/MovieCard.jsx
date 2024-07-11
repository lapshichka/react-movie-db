import React from 'react'
import "./MovieCard.scss"
import { Flex, Card, Image, Typography } from "antd"
import { format } from "date-fns"
import PropTypes from 'prop-types'

function MovieCard({posterPath, releaseDate, title, overview}) {
  const { Title, Paragraph, Text, Link } = Typography

  return (
    <Card hoverable className='card'>
      <Flex gap="large">
        <Image
          className='card__image'
          src={`https://media.themoviedb.org/t/p/w220_and_h330_face${posterPath}`}
          width={140}
          height={190}
          preview={false}
        />
        
        <Flex vertical className='card__text-content text-content' >
          <Title className='text-content__title' level={5}>{title}</Title>
          <Paragraph className='text-content__opening'>
            {releaseDate !== '' ? format(new Date(releaseDate), 'MMMM dd, yyyy') : null }
          </Paragraph>
          <Flex gap="small">
            <Paragraph className='text-content__genre'>Action</Paragraph>
            <Paragraph className='text-content__genre'>Drama</Paragraph>
          </Flex>
          <Paragraph>
            <Text disabled={overview === ''} className='text-content__description'>
              {overview !== '' ? overview : 'No description'}
            </Text>
          </Paragraph>
        </Flex>
      </Flex>
    </Card>
  )
}
MovieCard.propTypes = {
  posterPath: PropTypes.string.isRequired,
  releaseDate: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
}
export default MovieCard