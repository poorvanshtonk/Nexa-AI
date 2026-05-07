import '../styles/SettingsModal.css';

interface SettingsModalProps {
  onClose: () => void;
}

const SettingsModal = ({
  onClose,
}: SettingsModalProps) => {
  return (
    <div className="modal-overlay">
      <div className="settings-modal">

        <button
          className="close-btn"
          onClick={onClose}
        >
          ✕
        </button>

        <h2>Settings</h2>

        <div className="setting-item">
          <span>Theme</span>

          <button>
            Toggle Theme
          </button>
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
