import React, {Component} from 'react'
import { Layout } from 'antd'
import "./Main.scss"

import ApiClient from '../../services/apiClient'
import Spinner from '../Spinner/Spinner'
import ErrorIndicator from '../ErrorIndicator/ErrorIndicator'
import OfflineNotification from '../OfflineNotification/OfflineNotification'
import MovieView from '../MovieView/MovieView'


export default class Main extends Component {
  constructor() {
    super()
    this.state = {
      data: [],
      genre: [],
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
    this.mounted = true
    this.getGenres()

    window.addEventListener('online', this.updateNetworkStatus)
    window.addEventListener('offline', this.updateNetworkStatus)
  }

  componentDidUpdate(prevProps, prevState) {
    const {currentPage, queryName} = this.state

    if(prevState.currentPage !== currentPage || prevState.queryName !== queryName) {
      this.getPages(queryName)
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
    console.log('updateMovie')

    this.setState({isLoaded: true})
    try {
      const data = await this.apiClient.getAllMovie(query, page)
      const selectedData = data
      
      if (this.mounted) {
        this.setState({data: selectedData, isLoaded: false, queryName: query})
      }
    } catch (error) {
      this.setState({error, isLoaded: false})
    }
  }

  getPages = async (query) => {
    const pages = await this.apiClient.getTotalPages(query)
    const total = await pages * 10
    
    this.setState({totalPages: total})
  }

  paginate = (pageNumber) => {
    this.setState({currentPage: pageNumber})
  }

  getGenres = async () => {
    console.log('getGenres')
    const genres = this.apiClient.fetchGenres()

    const res = genres
    const genresData = await res

    if (this.mounted) {
      this.setState({genre: genresData})
    }
  }

  render() {
    const { data, error, isLoaded, currentPage, isOnline, queryName, totalPages, genre } = this.state
    const { Content } = Layout

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
      genres={genre}
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