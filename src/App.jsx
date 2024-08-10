import React, { Component } from 'react'
import { Flex, Layout } from 'antd'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'

import ApiClient from './services/apiClient'
import SiteHeader from './components/SiteHeader/SiteHeader'
import SiteFooter from './components/SiteFooter/SiteFooter'
import Main from './components/Main/Main'
import Rated from './components/Rated/Rated'
import { GenresProvider } from './components/GenresContext/GenresContext'

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

    if (this.mounted) {
      this.setState({genre: genres})
    }
  }

  render() {
    const { guestId, genre } = this.state

    return (
      <GenresProvider value={genre}>
        <Router>
          <Flex gap="middle" wrap>
            <Layout className='wrapper'>
              <SiteHeader />
              <Routes>
                <Route path="/" element={<Navigate to="/search" />} />
                <Route path='/search' element={ <Main guestId={guestId} /> } />
                <Route path='/rated' element={ <Rated guestId={guestId} /> } />
              </Routes>
              <SiteFooter />
            </Layout>
          </Flex>
        </Router>
      </GenresProvider>
    )
  }
}