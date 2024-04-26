import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../styles/header.css';
import { authAPICall } from '../../../utility/apiCalls';

function LogoutButton () {
  const navigate = useNavigate();

  const handleLogout = async () => {
    let response;
    try {
      // localStorage.removeItem('token')
      response = await authAPICall('admin/auth/logout', 'POST', localStorage.getItem('token'));
    } catch (error) {
      console.error('Error making API call:', error);
      return;
    }
    if (response.data && response.data.error) {
      console.error('Error in response data:', response.data.error);
      return;
    }

    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <button id='logout-button-id' className="white-background-grey-text-button presentation-header-button" title="Click here to logout" onClick={handleLogout}> Logout </button>
  );
}

export default LogoutButton;
