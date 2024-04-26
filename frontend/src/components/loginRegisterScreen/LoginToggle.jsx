import React from 'react';
import '../../styles/loginRegister.css';

function LoginToggle ({ toggleState, hidePopUp }) {
  const handleClick = () => {
    toggleState();
    hidePopUp();
  };

  return (
    <div className='login-register-toggle-container'>
      <span className='selected-toggle'>
        Login
      </span>
      <button className='non-selected-toggle' onClick={handleClick}>
        Register here
      </button>
    </div>
  );
}

export default LoginToggle;
