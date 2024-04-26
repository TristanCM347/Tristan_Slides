import React from 'react';
import LoginRegisterForm from './LoginRegisterForm';
import '../../styles/loginRegister.css';

function LoginRegisterScreen (loginOrRegister) {
  return (
    <div className='login-register-screen-background fancy-background-colour-theme'>
      <LoginRegisterForm loginOrRegister={loginOrRegister.loginOrRegister}/>
    </div>
  );
}

export default LoginRegisterScreen;
