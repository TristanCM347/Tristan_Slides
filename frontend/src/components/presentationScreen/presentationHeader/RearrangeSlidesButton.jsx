import React from 'react';

function RearrangeSlidesButton ({ setOptionsModalState }) {
  const handleRearrangeSlides = () => {
    setOptionsModalState('slide-rearrange');
  };

  return (
    <button id='presentation-header-rearrange-slides' onClick={handleRearrangeSlides} title="Click here to rearrange your presentations slides" className="white-background-grey-text-button presentation-header-button "> Rearrange Slides </button>
  )
}

export default RearrangeSlidesButton;
