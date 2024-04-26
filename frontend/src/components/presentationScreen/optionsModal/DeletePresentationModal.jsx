import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getData, setData } from '../../../utility/data';

function DeletePresentationModal ({ setOptionsModalState, presentation }) {
  const navigate = useNavigate();

  const handleConfirmDeletePresentation = async () => {
    console.log(presentation)
    const data = await getData();
    for (const presentationNum in data.store.presentations) {
      if (data.store.presentations[presentationNum].id === presentation.id) {
        data.store.presentations[presentationNum].isDeleted = true;
        await setData(data);
        navigate('/dashboard');
      }
    }
  };

  const handleCloseDeletePresPopup = () => {
    setOptionsModalState('none')
  }

  const handleEscapePress = (event) => {
    if (event.key === 'Escape') {
      handleCloseDeletePresPopup(event);
      return
    }
    if (event.key === 'Enter') {
      handleConfirmDeletePresentation(event);
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
      <h2>Are You Sure You Want To Delete This Presentation?</h2>
      <div className='presentation-modal-yes-no-contianer'>
        <button id='submit-delete-presentation-id' className="presentation-modal-yes presentation-modal-yes-no" onClick={handleConfirmDeletePresentation}>Yes</button>
        <button className="presentation-modal-no presentation-modal-yes-no" onClick={handleCloseDeletePresPopup}> No </button>
      </div>
    </div>
  );
}

export default DeletePresentationModal;
