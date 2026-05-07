
import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import ChatInput from './components/ChatInput';
import ProfileModal from './components/ProfileModal';
import SettingsModal from './components/SettingsModal';
import type { Message } from './types/message';
import './ModernUI.css';

const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const appendMessage = (
      sender: Message["sender"],
      text: string
    ) => {
      const newMessage: Message = {
        id: Date.now().toString(),
        sender,
        text,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, newMessage]);
    };

  const sendMessage = async (msg: string) => {
    if (!msg.trim()) return;
    appendMessage('user', msg);
    setIsTyping(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.reply ?? `Request failed with status ${response.status}`);
      appendMessage('nexa', data.reply ?? 'No reply received.');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unable to reach the chatbot server right now.';
      setError(message);
      appendMessage('nexa', 'I could not process that request. Please try again.');
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="nexa-root">
      <Sidebar
        isOpen={isSidebarOpen}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onClose={() => setIsSidebarOpen(false)}
        onNewChat={() => {
          setMessages([]);
          setError(null);
          setIsSidebarOpen(false);
        }}
      />

      {isProfileOpen && (
        <ProfileModal
          onClose={() => setIsProfileOpen(false)}
        />
      )}

      {isSettingsOpen && (
        <SettingsModal
          onClose={() => setIsSettingsOpen(false)}
        />
      )}

      <main className="nexa-main">
        <Header
          messageCount={messages.length}
          isTyping={isTyping}
          onMenuClick={() => setIsSidebarOpen(true)}
        />

        <section className="nexa-chat-area" aria-label="Nexa AI conversation">
          <ChatWindow messages={messages} isTyping={isTyping} />
          <ChatInput onSend={sendMessage} disabled={isTyping} />
        </section>

        {error && <div className="nexa-error-toast" role="status">{error}</div>}
      </main>
    </div>
  );
};

export default App;
