import React from 'react';

function SlideNumber ({ currentSlideNumInt }) {
  return (
    <div className='slide-number-container'>
      <p>{currentSlideNumInt}</p>
    </div>
  );
}

export default SlideNumber;
