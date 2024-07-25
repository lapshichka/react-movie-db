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
      const selectedData = data
      
      if (this.mounted) {
        this.setState({data: selectedData, isLoaded: false, queryName: query})
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