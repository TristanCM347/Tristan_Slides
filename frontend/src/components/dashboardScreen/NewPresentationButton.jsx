import React from 'react';
import '../../styles/header.css';

function NewPresentationButton ({ isNewModalShown, updateModalState, showNewModal }) {
  if (isNewModalShown || updateModalState.visibility) {
    return null;
  }

  return (
    <button id='create-presentation-button' className="white-background-grey-text-button big-presentation-header-button" title="Click here to create a new presentation" onClick={showNewModal}> New <br></br>Presentation </button>
  );
}

export default NewPresentationButton;
