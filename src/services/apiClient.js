import axios from 'axios'
import defaultPoster from '../assets/images/default_poster.jpg'

class ApiClient {
  constructor() {
    this.apiKey = '4f4e06ffddf93e3d3cb52e91fda3b9a7'
    this.firstApiUrl = 'https://api.themoviedb.org/3/search/movie'
  }

  async getResours(query) {
    const res = await fetch(`${this.firstApiUrl}?query=${query}&api_key=${this.apiKey}`)
    return res.json()
  }

  async getAllMovie() {
    const data = this.getResours('return')
    const { results } = await data

    return results.map((movie) => this.transformMovie(movie))
  }

  transformMovie(movie) {
    this.apiKey = '4f4e06ffddf93e3d3cb52e91fda3b9a7'
    return {
      id: movie.id,
      posterPath: movie.poster_path ? movie.poster_path : defaultPoster,
      releaseDate: movie.release_date ? new Date(movie.release_date) : 'Unknown release date',
      title: movie.title ? movie.title : 'Untitled Movie',
      overview: movie.overview ? movie.overview : 'No description',
    }
  }
}
export default ApiClient
