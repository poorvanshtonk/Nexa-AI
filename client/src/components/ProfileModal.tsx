import '../styles/ProfileModal.css';

interface ProfileModalProps {
  onClose: () => void;
}

const ProfileModal = ({
  onClose,
}: ProfileModalProps) => {
  return (
    <div className="modal-overlay">
      <div className="profile-modal">

        <button
          className="close-btn"
          onClick={onClose}
        >
          ✕
        </button>

        <div className="profile-avatar">
          P
        </div>

        <h2>Poorvansh Tonk</h2>

        <p>
          Building Nexa AI 🚀
        </p>

      </div>
    </div>
  );
};

export default ProfileModal;