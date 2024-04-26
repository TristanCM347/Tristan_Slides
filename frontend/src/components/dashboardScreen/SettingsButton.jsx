import React from 'react';
import '../../styles/header.css';

function SettingsButton ({ isNewModalShown, updateModalState, setIsSettingsModalShown }) {
  if (isNewModalShown || updateModalState.visibility) {
    return null;
  }

  const showModal = () => {
    setIsSettingsModalShown(true);
  }

  return (
    <button className="white-background-grey-text-button presentation-header-button" title="Click here to access settings" onClick={showModal}> Settings </button>
  );
}

export default SettingsButton;
