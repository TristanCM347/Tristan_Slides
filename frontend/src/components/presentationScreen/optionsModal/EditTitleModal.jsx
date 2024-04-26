import React, { useState, useEffect } from 'react';
import '../../../styles/loginRegister.css';

function EditTitleModal ({ setOptionsModalState, presentation, setPresentation }) {
  const initialPresentationName = () => {
    return presentation.name;
  }

  console.log(presentation.name)
  const [title, setTitle] = useState(initialPresentationName());

  const handleInputChange = (event) => {
    setTitle(event.target.value);
  };

  const handleEditTitle = (event) => {
    event.preventDefault();
    setPresentation(prevPresentation => ({
      ...prevPresentation,
      name: title
    }));
    setOptionsModalState('none');
  };

  const closeModal = (event) => {
    event.preventDefault();
    setOptionsModalState('none');
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (event.target.form.checkValidity()) {
        handleEditTitle(event);
      } else {
        event.target.form.reportValidity();
      }
    }
  };

  const handleEscapePress = (event) => {
    if (event.key === 'Escape') {
      closeModal(event);
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
      <form onSubmit={handleEditTitle}>
        <button className="close-presentation-modal-button" onClick={closeModal}>Exit</button>
        <h2>Edit Title Form</h2>
        <p>This wont save automatically</p>
        <label className='form-labels' htmlFor="presentation-name">New title:</label>
        <input onKeyDown={handleKeyDown} onChange={handleInputChange} type="text" className='form-inputs' id="presentation-name" name="presentationName" placeholder="Enter presentation name" defaultValue={initialPresentationName()} required></input>
        <button className='auth-submit-button white-background-grey-text-button' >Submit</button>
      </form>
    </div>
  );
}

export default EditTitleModal;
