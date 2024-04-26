import React, { useState } from 'react';

function AddTransitionModal ({ presentation, currentSlideNumInt, setPresentation, setOptionsModalState }) {
  const [transition, setTransition] = useState(presentation.transition);

  const handleSubmitTransition = () => {
    setPresentation(prevPresentation => {
      return {
        ...prevPresentation,
        transition
      };
    });
    setOptionsModalState('none');
  }

  const handleExitModal = () => {
    setOptionsModalState('none');
  }

  return (
    <div className='presentation-modal dark-background-colour-theme'>
      <button className="close-presentation-modal-button" onClick={handleExitModal}>Exit</button>
      <h2>Transition Form</h2>
      <label className='form-labels' htmlFor="slide-textbox">Do you want to use a transition?</label>
      <div>
        <label className='radio-button'>
          <input
            type="radio"
            name="transition"
            value="yes"
            onChange={() => setTransition(true)}
            checked={transition}
          />
          Yes
        </label>
        <label className='radio-button'>
          <input
            type="radio"
            name="transition"
            value="no"
            onChange={() => setTransition(false)}
            checked={!transition}
          />
          No
        </label>
      </div>
      <button className='auth-submit-button white-background-grey-text-button' onClick={handleSubmitTransition}>Submit</button>
    </div>
  );
}

export default AddTransitionModal;
