
import React, { useState, useEffect } from 'react';
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState<{ id: number; title: string; messages: Message[] }[]>([
    { id: 1, title: 'React bugs', messages: [] },
    { id: 2, title: 'Project planning', messages: [] }
  ]);
  const [currentChatId, setCurrentChatId] = useState<number | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    if (messages.length === 0) return;

    if (currentChatId === null) {
      // First message in a new chat! Create a history entry instantly.
      const newId = Date.now();
      const title = messages[0].text.substring(0, 25) + (messages[0].text.length > 25 ? '...' : '');
      setChatHistory(prev => [{ id: newId, title, messages }, ...prev]);
      setCurrentChatId(newId);
    } else {
      // Update existing chat history entry live
      setChatHistory(prev => prev.map(chat => 
        chat.id === currentChatId ? { ...chat, messages } : chat
      ));
    }
  }, [messages, currentChatId]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const appendMessage = (
      sender: Message["sender"],
      text: string
    ) => {
      const newMessage: Message = {
        id: Date.now(),
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
    <div className={`nexa-root ${theme}-theme`}>
      <Sidebar
        isOpen={isSidebarOpen}
        chatHistory={chatHistory}
        currentChatId={currentChatId}
        onSelectChat={(id) => {
          const selected = chatHistory.find(c => c.id === id);
          if (selected) {
            setMessages(selected.messages);
            setCurrentChatId(id);
          }
          if (window.innerWidth <= 860) {
            setIsSidebarOpen(false);
          }
        }}
        onDeleteChat={(id) => {
          setChatHistory(prev => prev.filter(c => c.id !== id));
          if (currentChatId === id) {
            setCurrentChatId(null);
            setMessages([]);
          }
        }}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onClose={() => setIsSidebarOpen(false)}
        onNewChat={() => {
          setCurrentChatId(null);
          setMessages([]);
          setError(null);
          if (window.innerWidth <= 860) {
            setIsSidebarOpen(false);
          }
        }}
      />

      {isProfileOpen && (
        <ProfileModal
          onClose={() => setIsProfileOpen(false)}
        />
      )}

      {isSettingsOpen && (
        <SettingsModal
          theme={theme}
          onToggleTheme={toggleTheme}
          onClose={() => setIsSettingsOpen(false)}
        />
      )}

      <main className="nexa-main">
        <Header
          messageCount={messages.length}
          isTyping={isTyping}
          isSidebarOpen={isSidebarOpen}
          onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
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
