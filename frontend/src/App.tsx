import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

interface QuoteResponse {
  quote: string;
}

function App() {
  const [quote, setQuote] = useState<string>('Loading...')
  const [error, setError] = useState<string>('')

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000'

  const fetchQuote = async () => {
    try {
      setError('')
      // Use full URL from environment variable
      const response = await axios.get<QuoteResponse>(`${apiUrl}/quotes`)
      setQuote(response.data.quote)
    } catch (error) {
      console.error('Error fetching quote:', error)
      setQuote('')
      setError('Failed to fetch quote. Make sure the backend is running.')
    }
  }

  useEffect(() => {
    fetchQuote()
  }, [])

  return (
    <div className="app">
      <h1>Daily Motivation Quotes</h1>
      <div className="quote-container">
        {error ? (
          <p className="error">{error}</p>
        ) : (
          <p className="quote">{quote}</p>
        )}
      </div>
      <button onClick={fetchQuote}>New Quote</button>
    </div>
  )
}

export default App