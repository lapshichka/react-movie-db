import axios from 'axios'
import defaultPoster from '../assets/images/default_poster.jpg'

class ApiClient {
  constructor() {
    this.apiKey = '4f4e06ffddf93e3d3cb52e91fda3b9a7'
    this.firstApiUrl = 'https://api.themoviedb.org/3/search/movie'
  }

  async getResours(query, page = null) {
    const res = await fetch(`${this.firstApiUrl}?query=${query}${page ? `&page=${page}` : ''}&api_key=${this.apiKey}`)
    return res.json()
  }

  async getAllMovie(query, page) {
    const data = await this.getResours(query, page)
    const { results } = await data

    return results.map((movie) => this.transformMovie(movie))
  }

  async getTotalPages(query) {
    const data = await this.getResours(query)
    return data.total_pages
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
