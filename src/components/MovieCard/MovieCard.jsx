import React, {Component} from 'react'
import "./MovieCard.scss"
import { Flex, Card, Image, Typography } from "antd"
import { format } from "date-fns"
import PropTypes from 'prop-types'
import defaultPoster from '../../assets/images/default_poster.jpg'
import ErrorIndicator from '../ErrorIndicator/ErrorIndicator'

export default class MovieCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      genre: [],
      error: null
    }
    this.getGenres()
  }

  getGenres = async () => {
    try {
      const {genres} = this.props

      const res = genres
      const genresData = await res
      
      if (Array.isArray(genresData) && genresData.length !== 0) {
        this.setState({genre: genresData})
      }
    } catch (e) {
      this.setState({error: e})
    }
  }

  render() {
    const {posterPath, releaseDate, title, overview} = this.props
    const {genre, error} = this.state

    const { Title, Paragraph, Text } = Typography

    const displayGenres = genre.map((item) => (
      <Paragraph className='text-content__genre'>{item}</Paragraph>
    ))

  
    const path = !posterPath.includes('data:image') ? `https://media.themoviedb.org/t/p/w220_and_h330_face${posterPath}` : posterPath
  
    const visibleError = error? <ErrorIndicator errorText={error} /> : null

    const content = !error
    ? <Card hoverable className='card'>
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
            <Flex wrap gap="small">
              {displayGenres}
            </Flex>
            <Paragraph >
              <Text disabled={overview.includes('No description')} className='text-content__description'>
                {overview}
              </Text>
            </Paragraph>
          </Flex>
        </Flex>
      </Card> 
    : null
    
    return (
      <>
        {visibleError}
        {content}
      </>
    )

  }
}
MovieCard.propTypes = {
  posterPath: PropTypes.string,
  releaseDate: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.string
  ]),
  title: PropTypes.string,
  overview: PropTypes.string,
  genres: PropTypes.func.isRequired,
}
MovieCard.defaultProps = {
  posterPath: defaultPoster,
  releaseDate: 'Unknown release date',
  title: 'Untitled Movie',
  overview: 'No description',
}