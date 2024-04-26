import React, { useEffect } from 'react';
import '../../../styles/presentation.css';
import { useParams, useNavigate } from 'react-router-dom';

function LeftSlide ({ currentSlideNumInt }) {
  const { presentationId } = useParams();
  const navigate = useNavigate();

  const handleLeftSlideClick = () => {
    navigate(`/${presentationId}/${currentSlideNumInt - 1}`);
  }

  const handleKeyPress = (event) => {
    if (event.key === 'ArrowLeft') {
      handleLeftSlideClick()
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [currentSlideNumInt]);

  return (
    <div onClick={handleLeftSlideClick} id='left-slide' className='slide-presentation-arrow-button dark-background-colour-theme' title="Go to left slide">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <path fill="white" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/>
      </svg>
    </div>
  )
}

export default LeftSlide;
