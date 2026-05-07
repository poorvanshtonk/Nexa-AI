import React, { useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';
import '../styles/ChatWindow.css';
import type { Message } from '../types/message';

interface ChatWindowProps {
  messages: Message[];
  isTyping: boolean;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, isTyping }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className="chat-window">
      <div className="chat-messages">
        {messages.length === 0 && (
          <div className="empty-state">
            <div className="hero-section">
              <h1 className="hero-gradient">How can I help you today?</h1>
              <p className="hero-subtitle">
                Nexa AI is your futuristic partner for research, coding, and creative drafting.
              </p>
            </div>
          </div>
        )}

        {messages.map((msg) => (
          <ChatMessage key={msg.id} sender={msg.sender} text={msg.text} timestamp={msg.timestamp} />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={scrollRef} />
      </div>
    </div>
  );
};

export default ChatWindow;
