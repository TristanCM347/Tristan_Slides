import React from 'react';
import '../../styles/loginRegister.css';

function RegisterToggle ({ toggleState, hidePopUp }) {
  const handleClick = () => {
    toggleState();
    hidePopUp();
  };

  return (
    <div className='login-register-toggle-container'>
      <button className='non-selected-toggle' onClick={handleClick}>
        Login here
      </button>
      <span className='selected-toggle'>
        Register
      </span>
    </div>
  );
}

export default RegisterToggle;
