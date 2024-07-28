import React from 'react'
import { List } from 'antd'
import { useMediaQuery } from 'react-responsive'
import PropTypes from 'prop-types'
import MovieCard from '../MovieCard/MovieCard'
import defaultPoster from '../../assets/images/default_poster.jpg'
import ApiClient from '../../services/apiClient'

function MovieList({data}) {
  const apiClient = new ApiClient()
  const {Item} = List

  const isMobile = useMediaQuery({query: '(max-width: 767.98px)'})

  return (
    <List
      grid={{
        column: isMobile ? 1 : 2,
        gutter: 30,
      }}
      className='movie__list'
      
      dataSource={data}
      renderItem={({id, posterPath, releaseDate, title, overview, genreIds}) => (
        <Item key={id}>
          <MovieCard className='movie__item' id={id} posterPath={posterPath} releaseDate={releaseDate} genres={apiClient.getGenres()} title={title} overview={overview} genreIds={genreIds}/>
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
      genreIds: PropTypes.number.isRequired
    })
  ),
}
MovieList.defaultProps = {
  data: [{
    posterPath: defaultPoster,
    releaseDate: 'Unknown release date',
    title: 'Untitled Movie',
    overview: 'No description',
  }]
}
export default MovieList
