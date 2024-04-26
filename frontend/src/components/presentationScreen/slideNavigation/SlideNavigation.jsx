import React, { useState, useEffect } from 'react';
import '../../../styles/presentation.css';
import LeftSlide from './LeftSlide';
import RightSlide from './RightSlide';

function SlideNavigation ({ optionsModalState, currentSlideNumInt, presentation }) {
  const [canNavigateLeft, setCanNavigateLeft] = useState(false);
  const [canNavigateRight, setCanNavigateRight] = useState(false);
  useEffect(() => {
    setCanNavigateLeft(currentSlideNumInt > 1);
    setCanNavigateRight(currentSlideNumInt < presentation.numSlides);
  }, [presentation.numSlides, currentSlideNumInt]);

  if (optionsModalState !== 'none') {
    return null;
  }

  return (
    <div className='slide-navigation-container'>
      {canNavigateLeft && <LeftSlide currentSlideNumInt={currentSlideNumInt}/>}
      {canNavigateRight && <RightSlide currentSlideNumInt={currentSlideNumInt}/>}
    </div>
  );
}

export default SlideNavigation;
