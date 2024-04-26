import React, { useEffect } from 'react';

function SavePresentationModal ({ setOptionsModalState }) {
  const handleCloseSavePopup = () => {
    setOptionsModalState('none')
  }

  const handleEscapePress = (event) => {
    if (event.key === 'Escape') {
      handleCloseSavePopup(event);
    }
    if (event.key === 'Enter') {
      handleCloseSavePopup(event);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleEscapePress);

    return () => {
      window.removeEventListener('keydown', handleEscapePress);
    };
  }, []);

  return (
    <div className='dark-background-colour-theme presentation-modal'>
      <h2>The presentation was saved!</h2>
      <div className='presentation-modal-yes-no-contianer'>
        <button onClick={handleCloseSavePopup} className="presentation-modal-no presentation-modal-yes-no"> Close </button>
      </div>
    </div>
  );
}

export default SavePresentationModal;
