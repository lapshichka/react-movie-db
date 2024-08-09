import React, {Component} from 'react'
import { Flex, Layout } from 'antd'
import PropTypes from 'prop-types'

import ApiClient from '../../services/apiClient'
import MovieList from '../MovieList/MovieList'
import ErrorIndicator from '../ErrorIndicator/ErrorIndicator'

export default class Rated extends Component {
  constructor() {
    super()
    this.state = {
      sessionInfo: [],
      error: null
    }
    this.apiClient = new ApiClient()
  }

  componentDidMount() {
    this.getSessionInfo()
  }

  getSessionInfo = async () => {
    const { guestId } = this.props

    try {
      const res = await this.apiClient.getGuestSessionInfo(guestId)
      this.setState({sessionInfo: res})
    } catch (err) {
      this.setState({error: err})
    }
    
  }

  render() {
    const { Content } = Layout
    const { guestId, genre } = this.props
    const { sessionInfo, error } = this.state

    return (
      error
      ? <ErrorIndicator errorText={error} />
      : <Content className='main'>
          <Flex gap="middle" align='center' className='main__container'>
            <MovieList data={sessionInfo || ''} genres={genre} guestId={guestId} />
          </Flex>
        </Content>
    )
  }
}
Rated.propTypes = {
  guestId: PropTypes.string.isRequired,
  genre: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    })
  ),
}
Rated.defaultProps = {
  genre: []
}