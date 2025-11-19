import React, { useEffect, useState } from 'react'
import Search from './components/Search.jsx'

const API_BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_TMDB_API_KEY

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

const App = () => {
  const [searchItem, setSearchItem] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [movies, setMovies] = useState([])
  const [isloading, setIsloading] = useState(false)

  const fetchMovies = async (query) => {
    setIsloading(true)

    try {
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`
      const response = await fetch(endpoint, API_OPTIONS)

      if (!response.ok) {
        throw new Error('failed to fetch movies')
      }

      const data = await response.json()

      // ❌ Your syntax was wrong: setErrorMessage(value:data.error)
      // ✔ Fixed:
      if (data.response === 'False') {
        setErrorMessage(data.error || 'failed to fetch movies')
        setMovies([])
        return
      }

      // Missing in your code: storing movies
      if (data.results) {
        setMovies(data.results)
      }

    } catch (error) {
      console.error('Error fetching movies:', error)
      setErrorMessage('Error fetching movies. Please try again later.')
    } finally {
      setIsloading(false)
    }
  }

  useEffect(() => {
    fetchMovies()
  }, [])

  return (
    <div className="pattern">
      <div className="wrapper">
        <header>
          <img src="/hero-img.png" alt="Logo" className="logo" />
          <h1>
            Find <span className="text-gradient">Movies </span>you'll Enjoy Without the hassle
          </h1>

          <Search searchItem={searchItem} setSearchItem={setSearchItem} />
        </header>

        <section className="all-movies">
          <h2>all movies</h2>

          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </section>
      </div>
    </div>
  )
}

export default App
