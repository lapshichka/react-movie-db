import React from 'react'
import "./MovieCard.scss"
import { Flex, Card, Image, Typography, List } from "antd"
import { format } from "date-fns"
import PropTypes from 'prop-types'
import defaultPoster from '../../assets/images/default_poster.jpg'

function MovieCard({id, posterPath, releaseDate, title, overview, genreIds, genres}) {
  const { Title, Paragraph, Text } = Typography
  const {Item} = List

  const path = !posterPath.includes('data:image') ? `https://media.themoviedb.org/t/p/w220_and_h330_face${posterPath}` : posterPath
  
  const filteredGenres = Array.isArray(genreIds) && genreIds.length !== 0
    ? genreIds.map(ids => (genres.find(genre => genre.id === ids && genre.name)))
    : ''
    
  return (
    <Card key={id} hoverable className='card'>
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
          <List
            grid={{
              gutter: 10,
            }}
            
            dataSource={filteredGenres}
            renderItem={({i, name}) =>
              <Item key={i}>
                <Paragraph key={i} className='text-content__genre'>{name}</Paragraph>
              </Item>
            }
            locale={{emptyText: !filteredGenres}}
          />

          <Paragraph >
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
  id: PropTypes.number.isRequired,
  posterPath: PropTypes.string,
  releaseDate: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.string
  ]),
  title: PropTypes.string,
  overview: PropTypes.string,
  genreIds: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.number.isRequired
    ])
  ),
  genres: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    })
  ),
}
MovieCard.defaultProps = {
  posterPath: defaultPoster,
  releaseDate: 'Unknown release date',
  title: 'Untitled Movie',
  overview: 'No description',
  genreIds: [],
  genres: [],
}

export default MovieCard