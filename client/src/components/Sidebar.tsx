import React, { useState, useEffect, useRef } from 'react';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import ArchiveRoundedIcon from '@mui/icons-material/ArchiveRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import type { Message } from '../types/message';
import '../styles/Sidebar.css';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNewChat: () => void;
  onOpenProfile: () => void;
  onOpenSettings: () => void;
  chatHistory: { id: number; title: string; messages: Message[] }[];
  currentChatId: number | null;
  onSelectChat: (id: number) => void;
  onDeleteChat: (id: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen, 
  onClose, 
  onNewChat, 
  onOpenProfile, 
  onOpenSettings,
  chatHistory,
  currentChatId,
  onSelectChat,
  onDeleteChat
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [menuPos, setMenuPos] = useState<{ top: number; left: number } | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    };
    
    const handleScroll = () => {
      // Close menu on scroll to prevent it from floating disconnected
      if (openMenuId !== null) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('resize', handleScroll);
    
    // Add scroll listener to the chat history container to close menu when scrolling
    const scrollContainer = document.querySelector('.chat-history-list');
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('resize', handleScroll);
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, [openMenuId]);

  const filteredHistory = chatHistory.filter(chat => 
    chat.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <aside className={isOpen ? 'sidebar is-open' : 'sidebar is-closed'} aria-label="Nexa navigation">
      <div className="sidebar-header">
        <div className="brand-lockup" aria-label="Nexa AI">
          <span className="brand-mark">N</span>
          <span className="brand-text">Nexa</span>
        </div>
        <button className="icon-button close-sidebar" type="button" aria-label="Close sidebar" onClick={onClose} title="Close Sidebar">
          <MenuRoundedIcon fontSize="small" />
        </button>
      </div>

      <button className="new-chat-btn" type="button" onClick={onNewChat}>
        <AddRoundedIcon fontSize="small" />
        New chat
      </button>

      <div className="sidebar-search">
        <SearchRoundedIcon fontSize="small" className="search-icon" />
        <input 
          type="text" 
          placeholder="Find chat..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <nav className="sidebar-nav">
        <p className="nav-label">Chat History</p>
        <div className="chat-history-list">
          {filteredHistory.map(chat => (
            <div className={`chat-history-item ${chat.id === currentChatId ? 'active' : ''}`} key={chat.id}>
              <button 
                className="sidebar-btn chat-history-btn" 
                type="button" 
                onClick={() => onSelectChat(chat.id)}
              >
                <ChatBubbleOutlineRoundedIcon fontSize="small" />
                <span>{chat.title}</span>
              </button>
              
              <div className="chat-options-container">
                <button 
                  className={`icon-button chat-options-trigger ${openMenuId === chat.id ? 'menu-open' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (openMenuId === chat.id) {
                      setOpenMenuId(null);
                    } else {
                      const rect = e.currentTarget.getBoundingClientRect();
                      setMenuPos({ top: rect.bottom + 4, left: rect.right - 150 });
                      setOpenMenuId(chat.id);
                    }
                  }}
                  aria-label="Chat options"
                >
                  <MoreVertRoundedIcon fontSize="small" />
                </button>
              </div>
            </div>
          ))}
          {filteredHistory.length === 0 && (
            <p className="no-chats-msg">No chats found.</p>
          )}
        </div>
      </nav>

      {openMenuId && menuPos && (
        <div 
          className="chat-options-menu" 
          ref={menuRef}
          style={{ top: menuPos.top, left: menuPos.left }}
        >
          <button type="button" onClick={() => setOpenMenuId(null)}>
            <ShareRoundedIcon fontSize="small" /> Share
          </button>
          <button type="button" onClick={() => setOpenMenuId(null)}>
            <ArchiveRoundedIcon fontSize="small" /> Archive
          </button>
          <div className="menu-divider"></div>
          <button 
            type="button" 
            className="danger" 
            onClick={() => { 
              onDeleteChat(openMenuId); 
              setOpenMenuId(null); 
            }}
          >
            <DeleteOutlineRoundedIcon fontSize="small" /> Delete
          </button>
        </div>
      )}

      <nav className="sidebar-footer">
        <button className="sidebar-btn" onClick={onOpenSettings}>
          <SettingsOutlinedIcon fontSize="small" />
          <span>Settings</span>
        </button>
        <button className="sidebar-btn" onClick={onOpenProfile}>
          <PersonOutlineRoundedIcon fontSize="small" />
          <span>Profile</span>
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
