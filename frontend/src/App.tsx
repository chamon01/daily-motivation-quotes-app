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
  const [quoteId, setQuoteId] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [success, setSuccess] = useState<string>('')

  // submission state
  const [newQuote, setNewQuote] = useState<string>('')
  const [newAuthor, setNewAuthor] = useState<string>('')

  // favorites state
  const [favorites, setFavorites] = useState<any[]>(JSON.parse(localStorage.getItem('favorites') || '[]'))

  // Use relative paths so production (same-origin) works without configuration.
  // In local dev, Vite proxy forwards these to the backend.

  const fetchQuote = async () => {
    try {
      setError('')
      setSuccess('')
    // Use relative path; Vite dev proxy will forward in dev.
  const response = await axios.get<QuoteResponse>(`/quotes`)
  setQuote(response.data.text)
  setAuthor(response.data.author || 'Unknown')
  setQuoteId(response.data._id || '')
    } catch (error) {
      console.error('Error fetching quote:', error)
      setQuote('')
      setError('Failed to fetch quote. Make sure the backend is running.')
    }
  }

  // Registration/Login removed

  const submitQuote = async () => {
    try {
      setError('')
      setSuccess('')
      if (!newQuote.trim()) {
        setError('Quote text is required')
        return
      }
  await axios.post(`/quotes`, { text: newQuote, author: newAuthor })
      setSuccess('Quote submitted!')
      setNewQuote('')
      setNewAuthor('')
      // refresh displayed quote list by fetching a new random one
      await fetchQuote()
    } catch (e: any) {
      setError(e?.response?.data?.error || 'Submission failed')
    }
  }

  const addFavorite = async () => {
    try {
      setError('')
      setSuccess('')
      const text = (quote || '').trim()
      const by = (author || 'Unknown').trim()
      if (!text) {
        setError('No quote to favorite yet')
        return
      }
      // Generate a stable synthetic id when backend does not provide one
      const syntheticId = quoteId || btoa(unescape(encodeURIComponent(`${text}::${by}`)))
      const exists = favorites.some((f) => f._id === syntheticId)
      if (exists) {
        setSuccess('Already in favorites')
        // still refresh to ensure UI shows latest
        await loadFavorites()
        return
      }
      const next = [...favorites, { _id: syntheticId, quote: { text, author: by } }]
      setFavorites(next)
      localStorage.setItem('favorites', JSON.stringify(next))
      setSuccess('Added to favorites')
      // force-refresh list from localStorage for consistency
      await loadFavorites()
    } catch (e: any) {
      setError('Failed to add favorite')
    }
  }

  const loadFavorites = async () => {
    const stored = JSON.parse(localStorage.getItem('favorites') || '[]')
    setFavorites(stored)
  }

  const removeFavorite = (favoriteId: string) => {
    setError('')
    setSuccess('')
    const next = favorites.filter((f) => f._id !== favoriteId)
    setFavorites(next)
    localStorage.setItem('favorites', JSON.stringify(next))
    setSuccess('Removed from favorites')
  }

  // Admin Moderation removed

  useEffect(() => {
    fetchQuote()
    loadFavorites()
    // optional: fetch admin flagged when toggled
  }, [])

  return (
    <div className="container">
      <header className="header">
        <h1 className="title">Daily Motivation</h1>
        <p className="subtitle">A fresh quote, a better day.</p>
      </header>

      <section className="card quote-card">
        {error ? (
          <p className="feedback error">{error}</p>
        ) : (
          <>
            <p className="quote-text">{quote}</p>
            {author && <p className="quote-author">— {author}</p>}
          </>
        )}
        {success && <p className="feedback success">{success}</p>}
        <div className="actions">
          <button className="btn btn-primary" onClick={fetchQuote}>New Quote</button>
          <button className="btn btn-outline" onClick={addFavorite}>Favorite</button>
        </div>
      </section>

      <div className="grid">
        <section className="card section">
          <h2>Submit a Quote</h2>
          <div className="form">
            <input className="input" placeholder="Quote text" value={newQuote} onChange={(e) => setNewQuote(e.target.value)} />
            <input className="input" placeholder="Author (optional)" value={newAuthor} onChange={(e) => setNewAuthor(e.target.value)} />
            <div className="actions" style={{ justifyContent: 'flex-start' }}>
              <button className="btn btn-primary" onClick={submitQuote}>Submit</button>
            </div>
          </div>
        </section>

        <section className="card section">
          <h2>Favorites</h2>
          <div className="actions" style={{ justifyContent: 'flex-start' }}>
            <button className="btn btn-outline" onClick={loadFavorites}>Refresh Favorites</button>
          </div>
          <ul className="list">
            {favorites.length === 0 && (
              <li className="muted">No favorites yet — add one you love.</li>
            )}
            {favorites.map((f, idx) => (
              <li key={f._id || idx} className="list-item">
                <span>{f.quote?.text} — <span className="muted">{f.quote?.author}</span></span>
                <button className="btn btn-outline" onClick={() => removeFavorite(f._id)}>Remove</button>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}

export default App