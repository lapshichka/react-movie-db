import React from 'react'
import "./MovieCard.scss"
import { Flex, Card, Image, Typography, List, Rate } from "antd"
import { format } from "date-fns"
import PropTypes from 'prop-types'
import defaultPoster from '../../assets/images/default_poster.jpg'
import ApiClient from '../../services/apiClient'

function MovieCard({id, posterPath, releaseDate, title, overview, genreIds, genres, voteAverage = 0, guestId, rating = null}) {
  const { Title, Paragraph, Text } = Typography
  const {Item} = List

  const apiClient = new ApiClient()

  const path = !posterPath.includes('data:image') ? `https://media.themoviedb.org/t/p/w220_and_h330_face${posterPath}` : posterPath
  
  const filteredGenres = Array.isArray(genreIds) && genreIds.length !== 0
    ? genreIds.map(ids => (genres.find(genre => genre.id === ids && genre.name))).splice(0, 3)
    : ''

  const assessmentStyle = (rate) => {
    let color

    if (rate <= 3) {
      color = '#E90000'
    } else if (rate > 3 && rate <= 5) {
      color = '#E97E00'
    } else if (rate > 5 && rate <= 7) {
      color = '#E9D100'
    } else {
      color = '#66E900'
    }
    return color
  }

  const handleRateMovie = (value) => {
    apiClient.rateMovie(guestId, id, value)
  }

  return (
    <Card key={id} hoverable className='card'>
      <Flex gap="middle">
        <Image
          className='card__image'
          src={path}
          width={140}
          height={220}
          preview={false}
        />
        
        <Flex vertical justify='space-between' className='card__text-content text-content' >
          <Flex justify='space-between'>
            <Title className='text-content__title' level={5}>{title}</Title>
            <Paragraph
              className='text-content__rating'
              style={{borderColor: assessmentStyle(voteAverage)}}
            >
              {voteAverage.toFixed(1)}
            </Paragraph>
          </Flex>
          <Paragraph className='text-content__opening'>
            {typeof releaseDate === 'object' ? format(releaseDate, 'MMMM dd, yyyy') : releaseDate }
          </Paragraph>
          <List
            grid={{
              gutter: 5,
            }}
            
            split
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

          <Rate allowHalf defaultValue={rating} count={10} onChange={handleRateMovie} />
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
  voteAverage: PropTypes.number.isRequired,
  guestId: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired
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