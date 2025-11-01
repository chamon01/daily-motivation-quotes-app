import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

interface QuoteResponse {
  quote: string;
}

function App() {
  const [quote, setQuote] = useState<string>('')

  const fetchQuote = async () => {
    try {
      const response = await axios.get<QuoteResponse>('/api/quotes')
      setQuote(response.data.quote)
    } catch (error) {
      console.error('Error fetching quote:', error)
      setQuote('Failed to fetch quote. Please try again.')
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