import React, { useState, useEffect } from 'react';

function AddTransitionModal ({ presentation, setPresentation, setOptionsModalState }) {
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

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (event.target.form.checkValidity()) {
        handleSubmitTransition(event);
      } else {
        event.target.form.reportValidity();
      }
    }
  };

  const handleEscapePress = (event) => {
    if (event.key === 'Escape') {
      handleExitModal(event);
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
      <form onSubmit={handleSubmitTransition}>
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
              onKeyDown={handleKeyDown}
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
              onKeyDown={handleKeyDown}
            />
            No
          </label>
        </div>
        <button className='auth-submit-button white-background-grey-text-button'>Submit</button>
      </form>
    </div>
  );
}

export default AddTransitionModal;
