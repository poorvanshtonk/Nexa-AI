import '../styles/SettingsModal.css';

interface SettingsModalProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onClose: () => void;
}

const SettingsModal = ({
  theme,
  onToggleTheme,
  onClose,
}: SettingsModalProps) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="settings-modal" onClick={(e) => e.stopPropagation()}>

        <button
          className="close-btn"
          onClick={onClose}
        >
          ✕
        </button>

        <h2>Settings</h2>

        <div className="settings-section">
          <h3 className="settings-section-title">Appearance</h3>
          <div className="setting-item">
            <span>Theme</span>
            <button onClick={onToggleTheme} type="button">
              {theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}
            </button>
          </div>
        </div>

        <div className="settings-section">
          <h3 className="settings-section-title">Personalization</h3>
          <div className="setting-item">
            <span>Font Size</span>
            <select className="setting-select">
              <option value="small">Small</option>
              <option value="medium" selected>Medium</option>
              <option value="large">Large</option>
            </select>
          </div>
          <div className="setting-item">
            <span>Language</span>
            <select className="setting-select">
              <option value="en" selected>English</option>
              <option value="es">Spanish</option>
              <option value="hi">Hindi</option>
            </select>
          </div>
        </div>

        <div className="settings-section">
          <h3 className="settings-section-title">Help & Support</h3>
          <div className="setting-item">
            <span>Documentation</span>
            <button type="button">View Docs</button>
          </div>
          <div className="setting-item">
            <span>Feedback</span>
            <button type="button">Send Feedback</button>
          </div>
        </div>

        <div className="upgrade-card">
          <h3>Upgrade Nexa AI</h3>

          <p>
            Unlock advanced AI capabilities.
          </p>

          <button>
            Upgrade
          </button>
        </div>

      </div>
    </div>
  );
};

export default SettingsModal;
