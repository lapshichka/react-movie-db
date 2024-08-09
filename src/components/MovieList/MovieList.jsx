import React from 'react'
import { List } from 'antd'
import { useMediaQuery } from 'react-responsive'
import PropTypes from 'prop-types'
import MovieCard from '../MovieCard/MovieCard'
import defaultPoster from '../../assets/images/default_poster.jpg'

function MovieList({data, genres, guestId}) {
  const {Item} = List

  const isMobile = useMediaQuery({query: '(max-width: 991.98px)'})

  return (
    <List
      grid={{
        column: isMobile ? 1 : 2,
        gutter: 30,
      }}
      className='movie__list'
      
      dataSource={data}
      renderItem={({id, posterPath, releaseDate, title, overview, genreIds, voteAverage, rating}) => (
        <Item key={id}>
          <MovieCard 
              className='movie__item'
              id={id}
              posterPath={posterPath}
              releaseDate={releaseDate}
              genres={genres}
              title={title}
              overview={overview}
              genreIds={genreIds}
              voteAverage={voteAverage}
              guestId={guestId}
              rating={rating}
            />
        </Item>
      )}
    />
  )
}
MovieList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
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
      voteAverage: PropTypes.number.isRequired,
    })
  ),
  genres: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    })
  ),
  guestId: PropTypes.string.isRequired
}
MovieList.defaultProps = {
  data: [{
    posterPath: defaultPoster,
    releaseDate: 'Unknown release date',
    title: 'Untitled Movie',
    overview: 'No description',
  }],
  genres: []
}
export default MovieList
