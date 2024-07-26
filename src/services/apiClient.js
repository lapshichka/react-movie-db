import axios from 'axios'
import defaultPoster from '../assets/images/default_poster.jpg'

class ApiClient {
  constructor() {
    this.apiKey = '4f4e06ffddf93e3d3cb52e91fda3b9a7'
    this.searchApiUrl = 'https://api.themoviedb.org/3/search/movie'
    this.genreApiUrl = 'https://api.themoviedb.org/3/movie'
  }

  async getResours(query, page = null) {
    const res = await fetch(`${this.searchApiUrl}?query=${query}${page ? `&page=${page}` : ''}&api_key=${this.apiKey}`)
    return res.json()
  }

  async getGenres(id = 1) {
    const res = await fetch(`${this.genreApiUrl}/${id}?api_key=${this.apiKey}`)
    const data = await res.json()
    return data.genres
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

  async getMoviesWithGenres(id) {
    const data = await this.getGenres(id)
    return data
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
