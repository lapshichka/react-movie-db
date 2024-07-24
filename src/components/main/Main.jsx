import React, {Component} from 'react'
import { Flex, Layout, Pagination, Alert } from 'antd'
import "./Main.scss"
import PropTypes from 'prop-types'

import ApiClient from '../../services/apiClient'
import MovieList from '../MovieList/MovieList'
import Spinner from '../Spinner/Spinner'
import ErrorIndicator from '../ErrorIndicator/ErrorIndicator'
import OfflineNotification from '../OfflineNotification/OfflineNotification'
import defaultPoster from '../../assets/images/default_poster.jpg'
import SearchInput from '../SearchInput/SearchInput'


export default class Main extends Component {
  constructor() {
    super()
    this.state = {
      data: [],
      error: null,
      isLoaded: false,
      currentPage: 1,
      isOnline: navigator.onLine,
      queryName: '',
      totalPages: 1,
    }
    this.mounted = false
    this.apiClient = new ApiClient()
  }

  componentDidMount() {
    const {currentPage} = this.state
    this.updateMovie('', currentPage)
    this.mounted = true

    window.addEventListener('online', this.updateNetworkStatus)
    window.addEventListener('offline', this.updateNetworkStatus)
  }

  componentDidUpdate(prebProps, prevState) {
    const {currentPage, queryName} = this.state

    if(prevState.currentPage !== currentPage) {
      this.updateMovie(queryName, currentPage)
    }
  }

  componentWillUnmount() {
    this.mounted = false
    window.removeEventListener('online', this.updateNetworkStatus)
    window.removeEventListener('offline', this.updateNetworkStatus)
  }

  updateNetworkStatus = () => {
    this.setState({isOnline: navigator.onLine})
  }

  updateMovie = async (query, page) => {
    this.setState({isLoaded: true})
    try {
      const data = await this.apiClient.getAllMovie(query, page)
      const selectedDate = data
      
      if (this.mounted) {
        this.setState({data: selectedDate, isLoaded: false, queryName: query})
      }
    } catch (error) {
      this.setState({error, isLoaded: false})
    }
  }

  getPages = async (query) => {
    const totalPages = await this.apiClient.getTotalPages(query)
    const total = await totalPages * 10

    this.setState({totalPages: total})
  }

  paginate = (pageNumber) => {
    this.setState({currentPage: pageNumber})
  }

  render() {
    const { data, error, isLoaded, currentPage, isOnline, queryName, totalPages } = this.state
    const { Content } = Layout

    this.getPages(queryName)

    const spinner = isLoaded ? <Spinner /> : null
    const visibleError = error? <ErrorIndicator errorText={error} /> : null
    const content =
      !(error || !isOnline)
      ? <MovieView 
          currentMovie={data} 
          paginate={this.paginate} 
          currentPage={currentPage} 
          total={totalPages} 
          updateMovie={this.updateMovie} 
          query={queryName}
          load={isLoaded}
        /> 
      : null

    return (
      <Content className='main'>
        {!isOnline ? <OfflineNotification /> : null}
        {visibleError}
        {content}
        {spinner}
      </Content>
    )
  }
}

function MovieView({ currentMovie, currentPage, total, paginate, updateMovie, query, load }) {
  const movie = !load
  ? <MovieList className="main__movie-list movie" data={currentMovie} />
  : null

  const visible =
  !query
  ? <Alert message="Enter your search query" type="info" showIcon />
  : <>
      {movie}
      <Pagination className='main__pagination' defaultCurrent={1} total={total} onChange={paginate} />
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
  load: PropTypes.bool.isRequired
}
MovieView.defaultProps = {
  currentMovie: [{
    posterPath: defaultPoster,
    releaseDate: 'Unknown release date',
    title: 'Untitled Movie',
    overview: 'No description',
  }]
}