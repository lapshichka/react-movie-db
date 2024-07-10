import React, {Component} from 'react'
import { Flex, Layout, Pagination } from 'antd'

import Card from '../card/Cards'
import "./main.scss"
import getMovie from '../../services/apiClient'

export default class Main extends Component {
  constructor() {
    super()
    this.state = {
      data: [],
      error: null,
      currentPage: 1
    }
    this.updateMovie()
  }

  updateMovie = async() => {
    try {
      const data = await getMovie('return')
      const {results} = await data

      const selectedDate = results.map((item) => ({
        id: item.id,
        posterPath: item.poster_path,
        releaseDate: item.release_date,
        title: item.title,
        overview: item.overview
      })
    )

      this.setState({data: selectedDate})
    } catch (error) {
      this.setState({error})
    }
  }

  paginate = (pageNumber) => {
    this.setState({currentPage: pageNumber})
  }

  render() {
    const { data, error, currentPage } = this.state
    const { Content } = Layout

    const lastMovieIndex = currentPage * 6
    const firstMovieIndex = lastMovieIndex - 6
    const currentMovie = data.slice(firstMovieIndex, lastMovieIndex)
    const total = Math.round(data.length / 6 * 10)

    return (
      <Content className='main'>
        <Flex wrap gap="middle" justify='center' className='container'>
          <Card data={currentMovie}/>
          <Pagination className='pagination' defaultCurrent={1} total={total} onChange={this.paginate}/>
        </Flex>
      </Content>
    )
  }
}