import React, { useState } from 'react';

interface SettingsPageProps {
  onClose?: () => void; // Optional callback for modal close
}

const SettingsPage: React.FC<SettingsPageProps> = ({ onClose }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true); // The modal is now open by default

  const handleToggle = (): void => {
    setNotificationsEnabled((prev) => !prev);
    setIsModalOpen(true);
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
    if (onClose) onClose();
  };

  // Inline styles
  const styles = {
    modalOverlay: {
      position: 'fixed' as 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modal: {
      background: 'white',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
      textAlign: 'center' as 'center',
      width: '400px', // Set a fixed width for the modal
    },
    settingsContainer: {
      padding: '20px',
    },
    notificationToggle: {
      marginBottom: '20px',
    },
    closeButton: {
      marginTop: '10px',
      padding: '10px 20px',
      background: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    closeButtonHover: {
      background: '#0056b3',
    },
    modalHeader: {
      fontSize: '20px',
      fontWeight: 'bold' as 'bold',
    },
  };

  return (
    isModalOpen && (
      <div style={styles.modalOverlay}>
        <div style={styles.modal}>
          <div style={styles.settingsContainer}>
            <h2 style={styles.modalHeader}>Settings</h2>
            <div style={styles.notificationToggle}>
              <label htmlFor="notifications">Notifications</label>
              <input
                id="notifications"
                type="checkbox"
                checked={notificationsEnabled}
                onChange={handleToggle}
              />
            </div>
            <p>Notifications are {notificationsEnabled ? 'enabled' : 'disabled'}.</p>

            <button
              style={styles.closeButton}
              onClick={closeModal}
              onMouseOver={(e) => (e.currentTarget.style.background = styles.closeButtonHover.background)}
              onMouseOut={(e) => (e.currentTarget.style.background = '#007bff')}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default SettingsPage;
