import { useState } from 'react'
import type { FormEvent, KeyboardEvent } from 'react'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import SendIcon from '@mui/icons-material/Send'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import TextField from '@mui/material/TextField'
import './App.css'

type ChatMessage = {
  id: string
  role: 'user' | 'bot'
  text: string
}

type ChatResponse = {
  reply?: string
}

const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000'

function App() {
  const [message, setMessage] = useState('')
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const appendMessage = (role: ChatMessage['role'], text: string) => {
    setChatHistory((prev) => [
      ...prev,
      {
        id: `${role}-${Date.now()}-${prev.length}`,
        role,
        text,
      },
    ])
  }

  const sendMessage = async () => {
    const trimmedMessage = message.trim()

    if (!trimmedMessage || isLoading) {
      if (!trimmedMessage) {
        setError('Message cannot be empty.')
      }
      return
    }

    setError(null)
    setIsLoading(true)
    appendMessage('user', trimmedMessage)
    setMessage('')

    try {
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: trimmedMessage }),
      })

      const data: ChatResponse = await response.json()

      if (!response.ok) {
        throw new Error(data.reply ?? `Request failed with status ${response.status}`)
      }

      appendMessage('bot', data.reply ?? 'No reply received.')
    } catch (caughtError) {
      const fallbackMessage = 'Unable to reach the chatbot server right now.'
      const nextError =
        caughtError instanceof Error && caughtError.message
          ? caughtError.message
          : fallbackMessage

      setError(nextError)
      appendMessage('bot', 'I could not process that request. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await sendMessage()
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      void sendMessage()
    }
  }

  return (
    <main className="app-shell">
      <section className="hero-card">
        <div className="hero-copy">
          <span className="hero-badge">
            <AutoAwesomeIcon fontSize="small" />
            AI Assistant
          </span>
          <h1>Ask the chatbot anything.</h1>
          <p>
            This interface sends your prompt to the Flask backend and displays the
            model response in a simple chat timeline.
          </p>
        </div>
      </section>

      {error ? (
        <Alert severity="error" className="status-banner">
          {error}
        </Alert>
      ) : null}

      <section className="chat-panel">
        <div className="chat-panel__header">
          <div>
            <h2>Conversation</h2>
            <p>{chatHistory.length === 0 ? 'No messages yet.' : 'Messages are shown below.'}</p>
          </div>
          {isLoading ? <CircularProgress size={22} /> : null}
        </div>

        <div className="chat-history" aria-live="polite">
          {chatHistory.length === 0 ? (
            <div className="empty-state">
              <AutoAwesomeIcon fontSize="large" color="warning" />
              <p>Start by typing a question below.</p>
            </div>
          ) : (
            chatHistory.map((entry) => (
              <article
                key={entry.id}
                className={`message-bubble message-bubble--${entry.role}`}
              >
                <span className="message-bubble__label">
                  {entry.role === 'user' ? 'You' : 'Bot'}
                </span>
                <p>{entry.text}</p>
              </article>
            ))
          )}
        </div>

        <form className="composer" onSubmit={handleSubmit}>
          <TextField
            id="chat-input"
            label="Type your question here"
            variant="outlined"
            fullWidth
            value={message}
            disabled={isLoading}
            onChange={(event) => {
              setMessage(event.target.value)
            }}
            onKeyDown={handleKeyDown}
          />
          <Button
            type="submit"
            variant="contained"
            endIcon={<SendIcon />}
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Ask'}
          </Button>
        </form>
      </section>
    </main>
  )
}

export default App
