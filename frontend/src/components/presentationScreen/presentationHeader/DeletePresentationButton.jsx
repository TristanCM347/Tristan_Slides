import React from 'react';

function DeletePresentationButton ({ setOptionsModalState }) {
  const handleDeletePresentation = () => {
    setOptionsModalState('delete-presentation');
  };

  return (
    <button id='delete-presentation-button' onClick={handleDeletePresentation} title="Click here to delete this presentation" className="white-background-grey-text-button presentation-header-button "> Delete </button>
  )
}

export default DeletePresentationButton;
