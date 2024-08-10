import React from 'react'
import PropTypes from 'prop-types'
import { Flex, Pagination, Alert } from 'antd'
import MovieList from '../MovieList/MovieList'
import SearchInput from '../SearchInput/SearchInput'
import defaultPoster from '../../assets/images/default_poster.jpg'

function MovieView({ currentMovie, currentPage, total, paginate, updateMovie, query, load, guestId }) {
  const movie = !load
  && <MovieList className="main__movie-list movie" data={currentMovie} guestId={guestId} />

  const visible =
  !query
  ? <Alert message="Enter your search query" type="info" showIcon />
  : <>
      {movie}
      <Pagination className='main__pagination' defaultCurrent={1} total={total} onChange={paginate} showSizeChanger={false} />
    </>
  return (
    <Flex gap="middle" align='center' className='main__container'>
      <SearchInput updateMovie={updateMovie} page={currentPage} />
      {visible}
    </Flex>
  )
}
MovieView.propTypes = {
  currentMovie: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      posterPath: PropTypes.string,
      releaseDate: PropTypes.oneOfType([
        PropTypes.instanceOf(Date),
        PropTypes.string
      ]),
      title: PropTypes.string,
      overview: PropTypes.string,
    })
  ),
  total: PropTypes.number.isRequired,
  paginate: PropTypes.func.isRequired,
  updateMovie: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  query: PropTypes.string.isRequired,
  load: PropTypes.bool.isRequired,
  guestId: PropTypes.string.isRequired
}
MovieView.defaultProps = {
  currentMovie: [{
    posterPath: defaultPoster,
    releaseDate: 'Unknown release date',
    title: 'Untitled Movie',
    overview: 'No description',
  }],
}

export default MovieView