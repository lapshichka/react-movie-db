import axios from 'axios'
import defaultPoster from '../assets/images/default_poster.jpg'

class ApiClient {
  constructor() {
    this.apiKey = '935272d4a46b7b3a2fa09b6f469cfff7'
    this.searchApiUrl = 'https://api.themoviedb.org/3/search/movie'
    this.genreApiUrl = 'https://api.themoviedb.org/3/genre/movie/list'
    this.guestSessionUrl = 'https://api.themoviedb.org/3/authentication/guest_session/new'
  }

  async getResours(query, page = null) {
    const res = await fetch(`${this.searchApiUrl}?query=${query}${page ? `&page=${page}` : ''}&api_key=${this.apiKey}`)
    return res.json()
  }

  async fetchGenres() {
    const res = await fetch(`${this.genreApiUrl}?api_key=${this.apiKey}`)
    const data = await res.json()
    return data.genres
  }

  async fetchGuestSessionInfo(guestId) {
    const url = `https://api.themoviedb.org/3/guest_session/${guestId}/rated/movies?api_key=${this.apiKey}`
    const res = await fetch(url)
    
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

  async createGuestSession () {
    const res = await fetch(`${this.guestSessionUrl}?api_key=${this.apiKey}`)
    const data = await res.json()
    return data.guest_session_id
  }

  async rateMovie(apiKeyGuest, movieId, rating) {
    const url = `https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=${this.apiKey}&guest_session_id=${apiKeyGuest}`
    
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({value: rating})
    })

    return res.json()
  }

  async getGuestSessionInfo(guestId) {
    const data = await this.fetchGuestSessionInfo(guestId)
    let res

    const { results } = await data
    if (results) {
      res = results.map((movie) => this.transformMovie(movie))
    }
    
    return res
  }

  transformMovie(movie) {
    this.apiKey = '935272d4a46b7b3a2fa09b6f469cfff7'
    return {
      id: movie.id,
      posterPath: movie.poster_path || defaultPoster,
      releaseDate: (movie.release_date && new Date(movie.release_date)) || 'Unknown release date',
      title: movie.title || 'Untitled Movie',
      overview: movie.overview || 'No description',
      genreIds: movie.genre_ids,
      voteAverage: movie.vote_average || 0,
      rating: movie.rating || 0
    }
  }
}
export default ApiClient
