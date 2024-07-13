import React, {Component} from 'react'
import { Flex, Layout, Pagination } from 'antd'
import "./Main.scss"
import PropTypes from 'prop-types'

import ApiClient from '../../services/apiClient'
import MovieList from '../MovieList/MovieList'
import Spinner from '../Spinner/Spinner'
import ErrorIndicator from '../ErrorIndicator/ErrorIndicator'
import OfflineNotification from '../OfflineNotification/OfflineNotification'


export default class Main extends Component {
  constructor() {
    super()
    this.state = {
      data: [],
      error: null,
      isLoaded: true,
      currentPage: 1,
      isOnline: navigator.onLine
    }
    this.apiClient = new ApiClient()
    this.updateMovie()
  }

  componentDidMount() {
    window.addEventListener('online', this.updateNetworkStatus)
    window.addEventListener('offline', this.updateNetworkStatus)
  }

  componentWillUnmount() {
    window.removeEventListener('online', this.updateNetworkStatus)
    window.removeEventListener('offline', this.updateNetworkStatus)
  }

  updateNetworkStatus = () => {
    this.setState({isOnline: navigator.onLine})
  }

  updateMovie = async() => {
    try {
      const data = await this.apiClient.getAllMovie()
      const selectedDate = await data
      

      this.setState({data: selectedDate, isLoaded: false})
    } catch (error) {
      this.setState({error, isLoaded: false})
    }
  }

  paginate = (pageNumber) => {
    this.setState({currentPage: pageNumber})
  }

  render() {
    const { data, error, isLoaded, currentPage, isOnline } = this.state
    const { Content } = Layout

    const lastMovieIndex = currentPage * 6
    const firstMovieIndex = lastMovieIndex - 6
    const currentMovie = data.slice(firstMovieIndex, lastMovieIndex)
    const total = Math.round(data.length / 6 * 10)

    const spinner = isLoaded ? <Spinner /> : null
    const visibleError = error? <ErrorIndicator errorText={error} /> : null
    const content = !(isLoaded || error || !isOnline) ? <MovieView currentMovie={currentMovie} total={total} paginate={this.paginate} /> : null

    return (
      <Content className='main'>
        {!isOnline ? <OfflineNotification /> : null}
        {spinner}
        {visibleError}
        {content}
      </Content>
    )
  }
}

function MovieView({ currentMovie, total, paginate }) {
  return (
    <Flex wrap gap="middle" justify='center' className='main__container'>
      <MovieList className="main__movie-list movie" data={currentMovie} />
      <Pagination className='main__pagination' defaultCurrent={1} total={total} onChange={paginate}/>
    </Flex>
  )
}
MovieView.propTypes = {
  currentMovie: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      posterPath: PropTypes.string.isRequired,
      releaseDate: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      overview: PropTypes.string.isRequired,
    })
  ),
  total: PropTypes.number.isRequired,
  paginate: PropTypes.func.isRequired,
}
MovieView.defaultProps = {
  currentMovie: []
}