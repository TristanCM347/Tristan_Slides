import React, { useState, useEffect } from 'react';
import '../../../styles/preview.css';
import PreviewLeftSlide from './PreviewLeftSlide';
import PreviewRightSlide from './PreviewRightSlide';

function PreviewNavigation ({ setChangeSlide, currentSlideNumInt, presentation }) {
  const [canNavigateLeft, setCanNavigateLeft] = useState(false);
  const [canNavigateRight, setCanNavigateRight] = useState(false);
  useEffect(() => {
    setCanNavigateLeft(currentSlideNumInt > 1);
    setCanNavigateRight(currentSlideNumInt < presentation.numSlides);
  }, [presentation.numSlides, currentSlideNumInt]);

  return (
    <div id='preview-slide-navigation-container'>
      {canNavigateLeft && <PreviewLeftSlide setChangeSlide={setChangeSlide} currentSlideNumInt={currentSlideNumInt} presentation={presentation} />}
      {canNavigateRight && <PreviewRightSlide setChangeSlide={setChangeSlide} currentSlideNumInt={currentSlideNumInt} presentation={presentation}/>}
    </div>
  );
}

export default PreviewNavigation;
