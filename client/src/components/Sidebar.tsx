import React from 'react';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import '../styles/Sidebar.css';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNewChat: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, onNewChat }) => (
  <aside className={isOpen ? 'sidebar is-open' : 'sidebar'} aria-label="Nexa navigation">
    <div className="sidebar-header">
      <div className="brand-lockup" aria-label="Nexa AI">
        <span className="brand-mark">N</span>
        <span className="brand-text">Nexa</span>
      </div>
      <button className="icon-button close-sidebar" type="button" aria-label="Close sidebar" onClick={onClose}>
        <CloseRoundedIcon fontSize="small" />
      </button>
    </div>

    <button className="new-chat-btn" type="button" onClick={onNewChat}>
      <AddRoundedIcon fontSize="small" />
      New chat
    </button>

    <nav className="sidebar-nav">
      <p className="nav-label">Workspace</p>
      <button className="sidebar-btn active" type="button">
        <ChatBubbleOutlineRoundedIcon fontSize="small" />
        <span>Current session</span>
      </button>
      <button className="sidebar-btn" type="button">
        <ChatBubbleOutlineRoundedIcon fontSize="small" />
        <span>Project notes</span>
      </button>
      <button className="sidebar-btn" type="button">
        <ChatBubbleOutlineRoundedIcon fontSize="small" />
        <span>Evaluation prompts</span>
      </button>
    </nav>

    <nav className="sidebar-footer">
      <button className="sidebar-btn" type="button">
        <SettingsOutlinedIcon fontSize="small" />
        <span>Settings</span>
      </button>
      <button className="sidebar-btn" type="button">
        <PersonOutlineRoundedIcon fontSize="small" />
        <span>Profile</span>
      </button>
    </nav>
  </aside>
);

export default Sidebar;
