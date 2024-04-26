import React from 'react';
import '../../../styles/toolbarList.css';

function DeleteSlide ({ setOptionsModalState }) {
  const handleDeleteSlideClick = () => {
    setOptionsModalState('delete-slide-confirm');
  }

  return (
    <div onClick={handleDeleteSlideClick} id='toolbar-delete-slide' className='toolbar-box' title="Click here to delete this slide">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <path fill="white" d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/>
      </svg>
    </div>
  )
}

export default DeleteSlide;
