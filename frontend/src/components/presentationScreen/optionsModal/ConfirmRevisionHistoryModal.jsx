import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { addNewHistory, changePresentationToVersion } from '../../../utility/data';

function ConfirmRevisionHistoryModal ({ setOptionsModalState, presentation, version }) {
  const navigate = useNavigate();
  const { presentationId } = useParams();

  const handleCloseSavePopup = () => {
    setOptionsModalState('none')
  }

  const handleSubmit = async () => {
    await addNewHistory(presentation);
    await changePresentationToVersion(version, presentation.id)
    navigate(`/${presentationId}`);
  }

  const handleEscapePress = (event) => {
    if (event.key === 'Escape') {
      handleCloseSavePopup(event);
      return
    }
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSubmit(event);
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
      <h2>Are you sure you want to go back to a previous Version History?</h2>
      <p>A copy of the current progress will be made under this current time</p>
      <div className='presentation-modal-yes-no-contianer'>
        <button onClick={handleSubmit} className="presentation-modal-yes presentation-modal-yes-no"> Yes </button>
        <button onClick={handleCloseSavePopup} className="presentation-modal-no presentation-modal-yes-no"> No </button>
      </div>
    </div>
  );
}

export default ConfirmRevisionHistoryModal;
