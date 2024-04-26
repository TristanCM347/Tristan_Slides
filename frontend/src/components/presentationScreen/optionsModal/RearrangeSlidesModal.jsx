import React, { useState } from 'react';
import '../../../styles/slide.css';
import '../../../styles/global.css';
import DraggableSlide from './DraggableSlide';

function RearrangeSlidesModal ({ presentation, currentSlideNumInt, setPresentation, setOptionsModalState }) {
  const [slides, setSlides] = useState(presentation.slides);

  const closeModal = (event) => {
    event.preventDefault();
    setOptionsModalState('none');
    setSlides([])
  }

  const submitNewOrder = () => {
    for (const i in slides) {
      slides[i].slideNum = parseInt(i) + 1;
    }
    setPresentation(prevPresentation => ({
      ...prevPresentation,
      slides
    }));
    setOptionsModalState('none');
  }

  return (
    <div className='presentation-screen-modal dark-background-colour-theme presentation-modal'>
      <button className="close-presentation-modal-button" onClick={closeModal}>Exit</button>
      <h2>Rearrange Slides Form</h2>
      <p>This wont save automatically</p>
      <div className='slides-drag-section'>
        {slides.map((slide, index) => (
          <DraggableSlide
            key={slide.id}
            index={index}
            slide={slide}
            slides={slides}
            setSlides={setSlides}
          />
        ))}
      </div>
      <button className='button-at-bottom auth-submit-button white-background-grey-text-button' onClick={submitNewOrder}>Submit</button>
    </div>
  );
}

export default RearrangeSlidesModal;
