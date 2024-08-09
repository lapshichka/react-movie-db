import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Layout } from 'antd'
import "./Main.scss"

import ApiClient from '../../services/apiClient'
import Spinner from '../Spinner/Spinner'
import ErrorIndicator from '../ErrorIndicator/ErrorIndicator'
import OfflineNotification from '../OfflineNotification/OfflineNotification'
import MovieView from '../MovieView/MovieView'
import { ApiClientConsumer } from '../ApiClientsContext/ApiClientsContext'

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
      hasError: false,
    }
    this.mounted = false
    this.apiClient = new ApiClient()
  }

  componentDidMount() {
    this.mounted = true

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

  componentDidCatch() {
    this.setState({hasError: true})
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
    const pages = await this.apiClient.getTotalPages(query)
    const total = await pages * 10
    
    this.setState({totalPages: total})
  }

  paginate = (pageNumber) => {
    this.setState({currentPage: pageNumber})
  }

  render() {
    const { guestId, genre } = this.props
    const { data, error, isLoaded, currentPage, isOnline, queryName, totalPages, hasError } = this.state
    const { Content } = Layout
    

    if (hasError) {
      return <ErrorIndicator errorText={error} />
    }

    const spinner = isLoaded && <Spinner />
    const visibleError = error && <ErrorIndicator errorText={error} />
    const content =
      !(error || !isOnline)
      && <MovieView
      currentMovie={data}
      paginate={this.paginate}
      currentPage={currentPage}
      total={totalPages}
      updateMovie={this.updateMovie}
      query={queryName}
      load={isLoaded}
      genres={genre}
      guestId={guestId}
    />

    return (
      <Content className='main'>
        {!isOnline && <OfflineNotification />}
        {visibleError}
        {content}
        {spinner}
      </Content>
    )
  }
}
Main.propTypes = {
  guestId: PropTypes.string.isRequired,
  genre: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    })
  ),
}

Main.defaultProps = {
  genre: []
}