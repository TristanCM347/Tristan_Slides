import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/loginRegister.css';
import '../../styles/global.css';
import { noAuthAPICall, authAPICall } from '../../utility/apiCalls';

function RegisterForm ({ popUpState, showPopUpWithInfo }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitBlurred, setIsSubmitBlurred] = useState(true);

  useEffect(() => {
    setEmail('');
    setName('');
    setPassword('');
    setConfirmPassword('');
  }, [popUpState]);

  useEffect(() => {
    if (email === '' || name === '' || password !== confirmPassword || password === '') {
      setIsSubmitBlurred(true);
    } else {
      setIsSubmitBlurred(false);
    }
  }, [email, name, password, confirmPassword, popUpState]);

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      console.error('Passwords do not match.');
      showPopUpWithInfo('Passwords do not match.');
      return;
    }

    let data;
    try {
      data = await noAuthAPICall('admin/auth/register', 'POST', JSON.stringify({
        email,
        password,
        name,
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

    let response;
    try {
      response = await authAPICall('store', 'PUT', localStorage.getItem('token'), JSON.stringify({
        store: {
          autoSave: false,
          numPresentations: 0,
          presentations: [],
          previews: [],
          history: [],
        }
      }));
    } catch (error) {
      console.error('Error making API call:', error);
      return;
    }
    if (response.data && response.data.error) {
      console.error('Error in response data:', response.data.error);
    }

    navigate('/dashboard');
  };

  if (popUpState.visible === true) {
    return null;
  }

  const handleUpdateEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleUpdateName = (event) => {
    setName(event.target.value)
  };

  const handleUpdatePassword = (event) => {
    setPassword(event.target.value)
  };

  const handlePasswordConfirm = (event) => {
    setConfirmPassword(event.target.value)
  };

  return (
    <form onSubmit={handleRegisterSubmit}>
      <label className='form-labels' htmlFor="name">Email:</label>
      <input onChange={handleUpdateEmail} className='form-inputs' type="email" name='email' id="register-email" placeholder='Email' required />
      <label className='form-labels' htmlFor="name">Name:</label>
      <input onChange={handleUpdateName} className='form-inputs' type="text" name='name' id="register-name" placeholder='Name' required />
      <label className='form-labels' htmlFor="name">Password:</label>
      <input onChange={handleUpdatePassword} className='form-inputs' type="password" name='password' id='register-password' placeholder='Password' required />
      <label className='form-labels' htmlFor="name">Confirm Password:</label>
      <input onChange={handlePasswordConfirm} className='form-inputs' type="password" name='password-confirm' id='confirm-register-password' placeholder='Confirm Password' required/>
      <button
        className={`auth-submit-button white-background-grey-text-button ${isSubmitBlurred ? 'blurred' : ''}`}
        id='submit-register-form-button'
        type='submit'
      >
        Submit
      </button>
    </form>
  );
}

export default RegisterForm;
