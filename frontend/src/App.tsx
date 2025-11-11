import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

interface QuoteResponse {
  text: string;
  author?: string;
  _id?: string;
}

function App() {
  const [quote, setQuote] = useState<string>('Loading...')
  const [author, setAuthor] = useState<string>('')
  const [error, setError] = useState<string>('')

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000'

  const fetchQuote = async () => {
    try {
      setError('')
      // Use full URL from environment variable
      const response = await axios.get<QuoteResponse>(`${apiUrl}/quotes`)
      setQuote(response.data.text)
      setAuthor(response.data.author || 'Unknown')
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
          <>
            <p className="quote">{quote}</p>
            {author && <p className="author">— {author}</p>}
          </>
        )}
      </div>
      <button onClick={fetchQuote}>New Quote</button>
    </div>
  )
}

export default App