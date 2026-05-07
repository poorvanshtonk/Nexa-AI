import React, { useState } from 'react';
import '../styles/ProfileModal.css';

interface ProfileModalProps {
  onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ onClose }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Poorvansh Tonk',
    email: 'poorvansh@example.com',
    mobile: '+91 9876543210',
    bio: 'Nexa AI Developer'
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    // Add logic here to sync with backend if needed
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose} aria-label="Close modal">✕</button>
        <div className="profile-avatar">{profile.name.charAt(0)}</div>
        
        {isEditing ? (
          <form className="edit-form" onSubmit={handleSave}>
            <div className="form-group">
              <label>Full Name</label>
              <input 
                type="text"
                value={profile.name} 
                onChange={(e) => setProfile({...profile, name: e.target.value})} 
                required
              />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input 
                type="email"
                value={profile.email} 
                onChange={(e) => setProfile({...profile, email: e.target.value})} 
                required
              />
            </div>
            <div className="form-group">
              <label>Mobile Number</label>
              <input 
                type="tel"
                value={profile.mobile} 
                onChange={(e) => setProfile({...profile, mobile: e.target.value})} 
                required
              />
            </div>
            <div className="form-group">
              <label>Bio</label>
              <input 
                type="text"
                value={profile.bio} 
                onChange={(e) => setProfile({...profile, bio: e.target.value})} 
              />
            </div>
            <button type="submit" className="save-btn">Save Changes</button>
          </form>
        ) : (
          <div className="profile-info">
            <h2>{profile.name}</h2>
            <p>{profile.email}</p>
            <p>{profile.mobile}</p>
            <p style={{ marginTop: '12px', fontStyle: 'italic' }}>"{profile.bio}"</p>
            <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit Profile</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileModal;