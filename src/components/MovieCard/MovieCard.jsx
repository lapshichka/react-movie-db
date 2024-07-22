import React from 'react'
import "./MovieCard.scss"
import { Flex, Card, Image, Typography } from "antd"
import { format } from "date-fns"
import PropTypes from 'prop-types'
import defaultPoster from '../../assets/images/default_poster.jpg'


function MovieCard({posterPath, releaseDate, title, overview}) {
  const { Title, Paragraph, Text, Link } = Typography

  const path = !posterPath.includes('data:image') ? `https://media.themoviedb.org/t/p/w220_and_h330_face${posterPath}` : posterPath

  return (
    <Card hoverable className='card'>
      <Flex gap="large">
        <Image
          className='card__image'
          src={path}
          width={115}
          height={165}
          preview={false}
        />
        
        <Flex vertical className='card__text-content text-content' >
          <Title className='text-content__title' level={5}>{title}</Title>
          <Paragraph className='text-content__opening'>
            {typeof releaseDate === 'object' ? format(releaseDate, 'MMMM dd, yyyy') : releaseDate }
          </Paragraph>
          <Flex gap="small">
            <Paragraph className='text-content__genre'>Action</Paragraph>
            <Paragraph className='text-content__genre'>Drama</Paragraph>
          </Flex>
          <Paragraph>
            <Text disabled={overview.includes('No description')} className='text-content__description'>
              {overview}
            </Text>
          </Paragraph>
        </Flex>
      </Flex>
    </Card>
  )
}
MovieCard.propTypes = {
  posterPath: PropTypes.string,
  releaseDate: PropTypes.instanceOf(Date),
  title: PropTypes.string,
  overview: PropTypes.string,
}
MovieCard.defaultProps = {
  posterPath: defaultPoster,
  releaseDate: 'Unknown release date',
  title: 'Untitled Movie',
  overview: 'No description',
}
export default MovieCard