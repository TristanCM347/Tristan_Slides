import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/loginRegister.css';
import '../../styles/global.css';
import { noAuthAPICall } from '../../utility/apiCalls'

function LoginForm ({ popUpState, showPopUpWithInfo }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitBlurred, setIsSubmitBlurred] = useState(true);

  useEffect(() => {
    setEmail('');
    setPassword('');
  }, [popUpState]);

  useEffect(() => {
    if (email === '' || password === '') {
      setIsSubmitBlurred(true);
    } else {
      setIsSubmitBlurred(false);
    }
  }, [email, password, popUpState]);

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    let data;
    try {
      data = await noAuthAPICall('admin/auth/login', 'POST', JSON.stringify({
        email,
        password,
      }));
    } catch (error) {
      console.error('Error making API call:', error);
      showPopUpWithInfo(`Error making API call: ${error}`);
      return;
    }

    if (data.data && data.data.error) {
      console.error('Error in response data:', data.data.error);
      showPopUpWithInfo(`Error in response data: ${data.data.error}`);
      return;
    }

    localStorage.setItem('token', data.token);
    navigate('/dashboard');
  };

  if (popUpState.visible === true) {
    return null;
  }

  const handleUpdateEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleUpdatePassword = (event) => {
    setPassword(event.target.value)
  };

  return (
    <form onSubmit={handleLoginSubmit}>
      <label className='form-labels' htmlFor="name">Email:</label>
      <input onChange={handleUpdateEmail} className='form-inputs' type="email" name='email' id="login-email" placeholder='Email' required />
      <label className='form-labels' htmlFor="name">Password:</label>
      <input onChange={handleUpdatePassword} className='form-inputs' type="password" name='password' id='login-password' placeholder='Password' required /> {/* Changed type to password */}
      <button
        className={`auth-submit-button white-background-grey-text-button ${isSubmitBlurred ? 'blurred' : ''}`}
        type='submit'
        id='submit-login-form-button'
      >
        Submit
      </button>    </form>
  );
}

export default LoginForm;
