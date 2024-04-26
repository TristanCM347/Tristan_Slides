import React, { useEffect } from 'react';

function DeleteSlideErrorModal ({ setOptionsModalState }) {
  const handleCloseSavePopup = () => {
    setOptionsModalState('none')
  }

  const handleEscapePress = (event) => {
    if (event.key === 'Escape') {
      handleCloseSavePopup(event);
      return
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
    <div className='presentation-modal dark-background-colour-theme'>
      <h2>Error: only 1 slide in presentation</h2>
      <p>If you still would like to delete the slide you must do so using by clicking the delete button</p>
      <div className='presentation-modal-yes-no-contianer'>
        <button onClick={handleCloseSavePopup} className="presentation-modal-no presentation-modal-yes-no"> Close </button>
      </div>
    </div>
  );
}

export default DeleteSlideErrorModal;
