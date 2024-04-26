import React, { useState } from 'react';
import '../../../styles/presentationModal.css';
import '../../../styles/loginRegister.css';

function AddBackgroundModal ({ presentation, currentSlideNumInt, setPresentation, setOptionsModalState }) {
  const [background, setBackground] = useState(presentation.slides[currentSlideNumInt].background);
  const [defaultBackground, setDefaultBackground] = useState(presentation.defaultBackground);
  const [useCustom, setUseCustom] = useState(presentation.slides[currentSlideNumInt].useCustom);
  console.log(presentation.slides[currentSlideNumInt].background)

  const handleSubmitAddBackground = () => {
    setPresentation(prevPresentation => {
      const updatedSlides = prevPresentation.slides.map(slide => {
        if (slide.slideNum === (currentSlideNumInt + 1)) {
          return {
            ...slide,
            useCustom,
            background,
          };
        }
        return slide;
      });
      return {
        ...prevPresentation,
        defaultBackground,
        slides: updatedSlides
      };
    });
    setOptionsModalState('none');
  }

  const handleColour = (event) => {
    setBackground(event.target.value);
  }

  const handleAllColours = (event) => {
    setDefaultBackground(event.target.value);
  }

  const handleExitModal = () => {
    setOptionsModalState('none');
  }
  return (
    <div className='presentation-modal dark-background-colour-theme'>
      <button className="close-presentation-modal-button" onClick={handleExitModal}>Exit</button>
      <h2>Background Form</h2>
      <label className='form-labels'>Use Custom Background for Current Slide:</label>
      <div>
        <label className='radio-button'>
          <input
            type="radio"
            name="custom"
            value="yes"
            onChange={() => setUseCustom(true)}
            checked={useCustom}
          />
          Yes
        </label>
        <label className='radio-button'>
          <input
            type="radio"
            id="file"
            name="custom"
            value="no"
            onChange={() => setUseCustom(false)}
            checked={!useCustom}
          />
          No
        </label>
      </div>
      {useCustom && (
        <>
          <label className='form-labels' htmlFor="slide-textbox">Current Slide Colour:</label>
          <input value={background} type="color" className="slide-colour form-color" onChange={handleColour}/>
        </>
      )}
      <label className='form-labels' htmlFor="slide-textbox">Default Colour:</label>
      <input value={defaultBackground} type="color" className="presentation-colour form-color" onChange={handleAllColours}/>
      <button className='submit-background-colour-modal auth-submit-button white-background-grey-text-button' onClick={handleSubmitAddBackground}>Submit</button>
    </div>
  );
}

export default AddBackgroundModal;
