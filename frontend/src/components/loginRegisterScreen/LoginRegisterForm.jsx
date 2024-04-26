import React, { useState } from 'react';
import '../../styles/loginRegister.css';
import LoginForm from './LoginForm';
import LoginToggle from './LoginToggle';
import { useNavigate } from 'react-router-dom';
import RegisterToggle from './RegisterToggle';
import RegisterForm from './RegisterForm';
import AuthErrorPopUp from './AuthErrorPopUp';

function LoginRegisterForm (loginState) {
  const navigate = useNavigate();
  const [loginOrRegister, setLoginOrRegister] = useState(loginState.loginOrRegister);
  const [popUpState, setPopUpState] = useState({ visible: false, info: '' });

  const showPopUpWithInfo = (info) => {
    setPopUpState({ visible: true, info });
  };

  const hidePopUp = () => {
    setPopUpState({ visible: false, info: '' });
  };

  const toggleLoginOrRegister = () => {
    setLoginOrRegister(!loginOrRegister);
    if (!loginOrRegister) {
      navigate('/register');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className='login-register-form-container dark-background-colour-theme'>
      {loginOrRegister ? (<h1 id='login-register-title'>Register Form</h1>) : (<h1 id='login-register-title'>Login Form</h1>)}
      {loginOrRegister ? <RegisterToggle toggleState={toggleLoginOrRegister} hidePopUp={hidePopUp}/> : <LoginToggle toggleState={toggleLoginOrRegister} hidePopUp={hidePopUp}/>}
      {loginOrRegister ? <RegisterForm popUpState={popUpState} showPopUpWithInfo={showPopUpWithInfo}/> : <LoginForm popUpState={popUpState} showPopUpWithInfo={showPopUpWithInfo}/>}
      <AuthErrorPopUp popUpState={popUpState} hidePopUp={hidePopUp}/>
    </div>
  );
}

export default LoginRegisterForm;
