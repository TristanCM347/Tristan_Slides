import React, { useEffect } from 'react';
import '../../../styles/preview.css';
import '../../../styles/presentation.css';

import { useParams, useNavigate } from 'react-router-dom';

function PreviewRightSlide ({ setChangeSlide, currentSlideNumInt, presentation }) {
  const { presentationId } = useParams();
  const navigate = useNavigate();

  const handleRightSlideClick = () => {
    if (presentation.transition) {
      setChangeSlide('right')
    }
    navigate(`/preview/${presentationId}/${currentSlideNumInt + 1}`);
    setTimeout(() => {
      setChangeSlide('none')
    }, 500)
  }

  const handleKeyPress = (event) => {
    if (event.key === 'ArrowRight') { // right arrow key
      handleRightSlideClick()
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [currentSlideNumInt]);

  return (
    <div onClick={handleRightSlideClick} id='preview-right-slide' className='slide-presentation-arrow-button dark-background-colour-theme' title="Go to right slide">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <path fill='white' d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/>
      </svg>
    </div>
  )
}

export default PreviewRightSlide;
