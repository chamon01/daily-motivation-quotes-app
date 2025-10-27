import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [quote, setQuote] = useState('')

  const fetchQuote = async () => {
    try {
      const response = await axios.get('http://localhost:3000/quotes')
      setQuote(response.data.quote)
    } catch (error) {
      console.error('Error fetching quote:', error)
    }
  }

  useEffect(() => {
    fetchQuote()
  }, [])

  return (
    <div className="app">
      <h1>Daily Motivation Quotes</h1>
      <div className="quote-container">
        <p className="quote">{quote}</p>
      </div>
      <button onClick={fetchQuote}>New Quote</button>
    </div>
  )
}

export default App