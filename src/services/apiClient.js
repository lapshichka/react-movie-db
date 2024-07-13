import axios from 'axios'

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
    this.apiKey = null
    return {
      id: movie.id,
      posterPath: movie.poster_path,
      releaseDate: movie.release_date,
      title: movie.title,
      overview: movie.overview,
    }
  }
}
export default ApiClient
