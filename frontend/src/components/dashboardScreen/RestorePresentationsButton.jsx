import React from 'react';
import '../../styles/header.css';

function RestorePresenationsButton ({ isNewModalShown, updateModalState, setIsRestoreModalShown }) {
  if (isNewModalShown || updateModalState.visibility) {
    return null;
  }

  const showModal = () => {
    setIsRestoreModalShown(true);
  }

  return (
    <button className="white-background-grey-text-button big-presentation-header-button" title="Click here to restore deleted presenations" onClick={showModal}> Restore <br></br>Presenations </button>
  );
}

export default RestorePresenationsButton;
