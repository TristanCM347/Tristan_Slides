import React from 'react';
import '../../styles/loginRegister.css';

function AuthErrorPopUp ({ popUpState, hidePopUp }) {
  const handleClosePopUp = () => {
    hidePopUp();
  }

  if (!popUpState.visible) {
    return null;
  }

  return (
    <div id="auth-error-popup">
      <h3>Error!</h3>
      <p>{popUpState.info}</p>
      <button id='auth-error-popup-button' onClick={handleClosePopUp}>Close</button>
    </div>
  )
}

export default AuthErrorPopUp;
