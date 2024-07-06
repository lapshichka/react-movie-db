import React from 'react'
import axios from 'axios'

  const getMovie = async (query) => {
    const API_KEY = '4f4e06ffddf93e3d3cb52e91fda3b9a7'
    const FIRST_API_URL = 'https://api.themoviedb.org/3/search/movie'

    const res = await fetch(`${FIRST_API_URL}?query=${query}&api_key=${API_KEY}`)
    return res.json()
  }

export default getMovie