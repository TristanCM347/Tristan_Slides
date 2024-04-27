import React, { useState, useEffect } from 'react';
import '../../../styles/slide.css';
import '../../../styles/global.css';
import '../../../styles/presentationModal.css';
import DraggableSlide from './DraggableSlide';

function RearrangeSlidesModal ({ presentation, setPresentation, setOptionsModalState }) {
  const [slides, setSlides] = useState(presentation.slides);

  const closeModal = (event) => {
    event.preventDefault();
    setOptionsModalState('none');
  }

  const submitNewOrder = () => {
    const updatedSlides = slides.map((slide, index) => ({
      ...slide,
      slideNum: index + 1
    }));
    setPresentation(prevPresentation => ({
      ...prevPresentation,
      slides: updatedSlides
    }));
    setOptionsModalState('none');
  }

  useEffect(() => {
    const handleEscapePress = (event) => {
      if (event.key === 'Escape') {
        closeModal(event);
      } else if (event.key === 'Enter') {
        submitNewOrder();
      }
    };

    window.addEventListener('keydown', handleEscapePress);

    return () => {
      window.removeEventListener('keydown', handleEscapePress);
    };
  }, [slides]);

  return (
    <div className='presentation-screen-modal dark-background-colour-theme presentation-modal'>
      <button className="close-presentation-modal-button" onClick={closeModal}>Exit</button>
      <h2>Rearrange Slides Form</h2>
      <p>This wont save automatically</p>
      <label className='center'>Drag the Slide onto the position in the deck you would like it.</label>
      <div className='slides-drag-section'>
        {slides.map((slide, index) => {
          return (
            <DraggableSlide
              key={slide.slideId}
              index={index}
              slide={slide}
              slides={slides}
              setSlides={setSlides}
            />
          );
        })}
      </div>
      <button onClick={submitNewOrder} className='button-at-bottom auth-submit-button white-background-grey-text-button'>Submit</button>
    </div>
  );
}

export default RearrangeSlidesModal;
