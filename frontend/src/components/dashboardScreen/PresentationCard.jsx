import React from 'react';
import '../../styles/dashboard.css';
import { useNavigate } from 'react-router-dom';

function PresentationCard ({ presentation, showUpdateModal }) {
  const navigate = useNavigate();

  const handlePresentationClick = () => {
    navigate(`/${presentation.id}`);
  }

  const handlePresentationSettingsClick = (event) => {
    event.stopPropagation();
    showUpdateModal(presentation);
  };

  return (
    <div onClick={handlePresentationClick} className="presentation-card dark-background-colour-theme">
      <h3 id='presentation-card-name'>{presentation.name}</h3>
      <div className='presentation-card-inside-container' title="Open this presentation">
        <div className='presentation-card-image-container'>
          <img id='presentation-thumbnail-displayid' src={presentation.thumbnailUrl} alt="Presenation Thumbnail"></img>
        </div>
        <div className='presentation-card-info-container'>
          <p id='presentation-description-id' className='presentation-card-description' ><span className='bold'>Description: </span><span>{presentation.description}</span></p>
          <p className='presentation-card-slides' ><span className='bold'>Slides: </span><span>{presentation.numSlides}</span></p>
        </div>
      </div>
      <svg onClick={handlePresentationSettingsClick} title="Settings" id='presentation-card-settings-icon' width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <title>Presentation Settings</title>
        <rect x="0" y="3" width="25" height="3" fill="rgb(235, 100, 150)"/>
        <rect x="0" y="12" width="25" height="3" fill="rgb(235, 100, 150)"/>
        <rect x="0" y="21" width="25" height="3" fill="rgb(235, 100, 150)"/>
      </svg>
    </div>
  );
}

export default PresentationCard;
