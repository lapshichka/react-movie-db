import React from 'react'
import { List } from 'antd'
import PropTypes from 'prop-types'
import MovieCard from '../MovieCard/MovieCard'


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
      posterPath: PropTypes.string.isRequired,
      releaseDate: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      overview: PropTypes.string.isRequired,
    })
  )
}
MovieList.defaultProps = {
  data: []
}
export default MovieList
