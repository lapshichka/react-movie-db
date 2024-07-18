import React from 'react'
import { List } from 'antd'
import PropTypes from 'prop-types'
import MovieCard from '../MovieCard/MovieCard'
import defaultPoster from '../../assets/images/default_poster.jpg'

function MovieList({data}) {
  const {Item} = List

  return (
    <List
      grid={{
        column: 2,
        gutter: 30,
      }}
      className='movie__list'
      
      dataSource={data}
      renderItem={({id, posterPath, releaseDate, title, overview}) => (
        <Item key={id}>
          <MovieCard className='movie__item' posterPath={posterPath} releaseDate={releaseDate} title={title} overview={overview}/>
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
      releaseDate: PropTypes.instanceOf(Date),
      title: PropTypes.string,
      overview: PropTypes.string,
    })
  )
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
