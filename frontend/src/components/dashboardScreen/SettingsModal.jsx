import React, { useState, useEffect } from 'react';
import { authAPICall } from '../../utility/apiCalls';

import '../../styles/dashboard.css';
import '../../styles/presentationModal.css';

function SettingsModal ({ isNewModalShown, updateModalState, setIsSettingsModalShown }) {
  if (isNewModalShown || updateModalState.visibility) {
    return null;
  }

  const [autoSave, setAutoSave] = useState(null);

  const [store, setStore] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await authAPICall('store', 'GET', localStorage.getItem('token'));
        if (data.data && data.data.error) {
          console.error('Error in response data:', data.data.error);
          return;
        }
        setStore(data.store);
        if (data.store.autoSave) {
          setAutoSave('yes');
        } else if (!data.store.autoSave) {
          setAutoSave('no');
        }
      } catch (error) {
        console.error('Error making API call:', error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (store !== null) {
      setDataLoaded(true);
    }
  }, [store]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!dataLoaded) {
      setIsSettingsModalShown(false);
      return;
    }
    let booleanAutoSave;
    if (autoSave === 'no') {
      booleanAutoSave = false;
    } else if (autoSave === 'yes') {
      booleanAutoSave = true;
    }
    const updatedStore = {
      ...store,
      autoSave: booleanAutoSave,
    };

    let response
    try {
      response = await authAPICall('store', 'PUT', localStorage.getItem('token'), JSON.stringify({
        store: updatedStore
      }));
    } catch (error) {
      console.error('Error making API call:', error);
      return;
    }
    if (response.data && response.data.error) {
      console.error('Error in response data:', response.data.error);
    }
    setIsSettingsModalShown(false);
  }

  const handleAutosaveChange = (event) => {
    setAutoSave(event.target.value)
  }

  const closeModal = (event) => {
    event.preventDefault();
    setIsSettingsModalShown(false);
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (event.target.form.checkValidity()) {
        handleSubmit(event);
      } else {
        event.target.form.reportValidity();
      }
    }
  };

  const handleEscapePress = (event) => {
    if (event.key === 'Escape') {
      closeModal(event);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleEscapePress);

    return () => {
      window.removeEventListener('keydown', handleEscapePress);
    };
  }, []);

  return (
    <div className=' presentation-modal dark-background-colour-theme'>
      <form onSubmit={handleSubmit}>
        <button className="close-presentation-modal-button" onClick={closeModal}>Exit</button>
        <h2> Settings </h2>
        {dataLoaded && (
          <>
            <label className='form-labels'>Autosave:</label>
            <div>
              <label className='radio-button'>
                <input
                  type="radio"
                  id="autosave-yes"
                  name="autosave"
                  value="yes"
                  onChange={handleAutosaveChange}
                  checked={autoSave === 'yes'}
                  onKeyDown={handleKeyDown}
                />
                Yes
              </label>
              <label className='radio-button'>
                <input
                  type="radio"
                  id="autosave-no"
                  name="autosave"
                  value="no"
                  onChange={handleAutosaveChange}
                  checked={autoSave === 'no'}
                  onKeyDown={handleKeyDown}
                />
                No
              </label>
            </div>
          </>
        )}
        <button id="submit-presentation-modal-button" className="submit-form-button white-background-grey-text-button" > Submit </button>
      </form>
    </div>
  );
}

export default SettingsModal;
