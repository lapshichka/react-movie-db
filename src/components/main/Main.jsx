import React, {Component} from 'react'
import Card from '../card/Card'
import "./main.scss"
import getMovie from '../../services/apiClient'


export default class Main extends Component {
  constructor() {
    super()
    this.state = {
      data: [],
      error: null
    }
    this.updateMovie()
  }

  updateMovie = async() => {
    try {
      const data = await getMovie('return')
      const {results} = await data

      const selectedDate = results.map((item) => ({
        posterPath: item.poster_path,
        releaseDate: item.release_date,
        title: item.title,
        overview: item.overview
      })
    )
    console.log('selectedDate', selectedDate)

      this.setState({data: selectedDate})
    } catch (error) {
      this.setState({error})
    }
  }

  render() {
    const { data, error } = this.state
    console.log('data', data)

    return (
      <main className='main'>
        <div className='container'>
          <Card data={data}/>
        </div>
      </main>
    )
  }
}