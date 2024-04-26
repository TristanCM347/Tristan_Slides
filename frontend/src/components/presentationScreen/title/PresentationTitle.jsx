import React from 'react';
import '../../../styles/presentation.css';

function PresentationTitle ({ presentation, optionsModalState }) {
  if (optionsModalState !== 'none') {
    return null;
  }

  return (
    <div className='presentation-title-container dark-background-colour-theme'>
      <h2 className='presentation-title' >{presentation.name}</h2>
    </div>
  );
}

export default PresentationTitle;
