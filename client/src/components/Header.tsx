import React from 'react';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import '../styles/Header.css';

interface HeaderProps {
  messageCount: number;
  isTyping: boolean;
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ messageCount, isTyping, onMenuClick }) => (
  <header className="header">
    <div className="header-left">
      <button className="icon-button menu-button" type="button" aria-label="Open sidebar" onClick={onMenuClick}>
        <MenuRoundedIcon fontSize="small" />
      </button>
      <div>
        <h1 className="header-title">Nexa AI</h1>
        <p className="header-subtitle">Research assistant workspace</p>
      </div>
    </div>

    <div className="header-actions" aria-label="Session status">
      <span className="status-pill">
        <span className={isTyping ? 'status-dot is-active' : 'status-dot'} />
        {isTyping ? 'Responding' : 'Ready'}
      </span>
      <span className="header-meta">{messageCount} messages</span>
    </div>
  </header>
);

export default Header;
