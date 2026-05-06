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
            <span className="empty-kicker">Nexa AI</span>
            <h2>Start a focused research conversation.</h2>
            <p>Ask for summaries, implementation ideas, project documentation, or evaluation support.</p>
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
