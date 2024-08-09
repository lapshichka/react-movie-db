import React, { Component } from 'react'
import { Flex, Layout } from 'antd'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'

import ApiClient from './services/apiClient'
import SiteHeader from './components/SiteHeader/SiteHeader'
import SiteFooter from './components/SiteFooter/SiteFooter'
import Main from './components/Main/Main'
import Rated from './components/Rated/Rated'
import { ApiClientProvider } from './components/ApiClientsContext/ApiClientsContext'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      guestId: '',
      genre: [],
    }
    this.apiClient = new ApiClient()
    this.mounted = false
  }

  componentDidMount() {
    this.mounted = true
    this.getGenres()
    this.getGuestId()
  }

  componentWillUnmount() {
    this.mounted = false
  }

  getGuestId = async () => {
    const res = this.apiClient.createGuestSession()
    const data = await res

    this.setState({guestId: data})
  }

  getGenres = async () => {
    const genres = await this.apiClient.fetchGenres()

    const res = await genres
    const genresData = await res

    if (this.mounted) {
      this.setState({genre: genresData})
    }
  }

  render() {
    const { guestId, genre } = this.state

    return (
      <ApiClientProvider value={this.apiClient}>
        <Router>
          <Flex gap="middle" wrap>
            <Layout className='wrapper'>
              <SiteHeader />
              <Routes>
                <Route path="/" element={<Navigate to="/search" />} />
                <Route path='/search' element={ <Main guestId={guestId} genre={genre} /> } />
                <Route path='/rated' element={ <Rated guestId={guestId} genre={genre} /> } />
              </Routes>
              <SiteFooter />
            </Layout>
          </Flex>
        </Router>
      </ApiClientProvider>
    )
  }
}