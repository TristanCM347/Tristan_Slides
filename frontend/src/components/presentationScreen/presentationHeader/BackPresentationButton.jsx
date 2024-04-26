import React from 'react';
import { useNavigate } from 'react-router-dom';

function BackPresentationButton () {
  const navigate = useNavigate();

  const handleMoveToDashboard = () => {
    navigate('/dashboard')
  };

  return (
    <button id='presentation-header-back' onClick={handleMoveToDashboard} title="Click here to go back to dashboard" className="white-background-grey-text-button presentation-header-button "> Back </button>
  )
}

export default BackPresentationButton;
