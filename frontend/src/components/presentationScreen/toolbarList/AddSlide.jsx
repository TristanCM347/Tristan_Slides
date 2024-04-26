import React from 'react';
import '../../../styles/toolbarList.css';
import { createNewSlide } from '../../../utility/data';

function AddSlide ({ presentation, setPresentation }) {
  const handleAddSlideClick = () => {
    const slideNum = presentation.slides.length + 1;
    const slide = createNewSlide(slideNum);
    slide.presentationBackground = presentation.slides[0].presentationBackground
    setPresentation(prevPresentation => {
      return {
        ...prevPresentation,
        slides: [...prevPresentation.slides, slide],
        numSlides: prevPresentation.numSlides + 1
      };
    });
  }

  return (
    <div onClick={handleAddSlideClick} id='toolbar-add-slide' className='toolbar-box' title="Click here to add a new slide">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <path fill="white" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/>
      </svg>
    </div>
  );
}

export default AddSlide;
