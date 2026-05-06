import React, { useState } from 'react';
import type { FormEvent, KeyboardEvent } from 'react';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import '../styles/ChatInput.css';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend, disabled }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSend(input);
      setInput('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (input.trim() && !disabled) {
        onSend(input);
        setInput('');
      }
    }
  };

  return (
    <div className="input-container">
      <form className="chat-input-wrapper" onSubmit={handleSubmit}>
        <textarea
          className="chat-input"
          placeholder="Ask Nexa to explain, summarize, compare, or draft..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          rows={1}
          autoFocus
        />
        <button className="send-btn" type="submit" disabled={disabled || !input.trim()} aria-label="Send message">
          <SendRoundedIcon fontSize="small" />
        </button>
      </form>
      <p className="composer-hint">Press Enter to send. Shift + Enter adds a new line.</p>
    </div>
  );
};

export default ChatInput;
