import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function DeleteSlideConfirmModal ({ setCurrentSlideNumInt, setOptionsModalState, presentation, setPresentation, currentSlideNumInt }) {
  const { presentationId } = useParams();
  const navigate = useNavigate();

  const handleConfirmDeleteSlide = () => {
    if (presentation.numSlides === 1) {
      setOptionsModalState('delete-slide-error');
      return;
    }

    const slideIndex = currentSlideNumInt - 1;
    const prevNumSlides = presentation.numSlides;
    if (currentSlideNumInt === prevNumSlides) {
      setCurrentSlideNumInt(currentSlideNumInt - 1)
      navigate(`/${presentationId}/${currentSlideNumInt - 1}`);
    } else {
      navigate(`/${presentationId}/${currentSlideNumInt}`);
    }

    setPresentation(prevPresentation => {
      const updatedSlides = prevPresentation.slides
        .filter((_, index) => index !== slideIndex)
        .map((slide, index) => ({
          ...slide,
          slideNum: index + 1
        }));
      return {
        ...prevPresentation,
        slides: updatedSlides,
        numSlides: prevPresentation.numSlides - 1
      };
    });
    handleCloseDeletePresPopup();
  }

  const handleCloseDeletePresPopup = () => {
    setOptionsModalState('none')
  }

  const handleEscapePress = (event) => {
    if (event.key === 'Escape') {
      handleCloseDeletePresPopup(event);
      return
    }
    if (event.key === 'Enter') {
      handleConfirmDeleteSlide(event);
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
      <h2>Are You Sure You Want To Delete This Slide?</h2>
      <div className='presentation-modal-yes-no-contianer'>
        <button className="presentation-modal-yes presentation-modal-yes-no" onClick={handleConfirmDeleteSlide}>Yes</button>
        <button className="presentation-modal-no presentation-modal-yes-no" onClick={handleCloseDeletePresPopup}> No </button>
      </div>
    </div>
  );
}

export default DeleteSlideConfirmModal;
