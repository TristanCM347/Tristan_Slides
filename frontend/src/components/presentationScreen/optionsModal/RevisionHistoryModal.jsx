import React, { useState, useEffect } from 'react';
import { authAPICall } from '../../../utility/apiCalls';
import { formattedDateTime } from '../../../utility/data'

import '../../../styles/dashboard.css';
import '../../../styles/presentationModal.css';

function RevisionHistoryModal ({ setOptionsModalState, presentation, setVersion }) {
  const [store, setStore] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [versionHistory, setVersionHistory] = useState([]);
  const [selectedVersion, setSelectedVersion] = useState('current');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await authAPICall('store', 'GET', localStorage.getItem('token'));
        if (data.data && data.data.error) {
          console.error('Error in response data:', data.data.error);
          return;
        }
        setStore(data.store);
        for (let i = 0; i < data.store.history.length; i++) {
          if (data.store.history[i].id === presentation.id) {
            setVersionHistory(data.store.history[i].versionHistory)
          }
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

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!dataLoaded) {
      setOptionsModalState('none');
      return;
    }
    if (selectedVersion === 'current') {
      setOptionsModalState('none');
      return;
    }
    setVersion(selectedVersion);
    setOptionsModalState('confirm-revision-history');
  }

  const closeModal = (event) => {
    event.preventDefault();
    setOptionsModalState('none');
  }

  const handleRadioChange = (time) => {
    setSelectedVersion(time);
  };

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
    <div className='presentation-modal dark-background-colour-theme'>
      <form onSubmit={handleSubmit}>
        <button className="close-presentation-modal-button" onClick={closeModal}>Exit</button>
        <h2>Revision History Form</h2>
        {dataLoaded && versionHistory.length > 0 && (
          <div className='restore-presentation-form'>
            <div className="restore-presentation-item">
              <input
                type="radio"
                name="presentationRestore"
                value="current"
                onKeyDown={handleKeyDown}
                checked={selectedVersion === 'current'}
                onChange={() => handleRadioChange('current')}
              />
              <label className="presentation-label">Current State</label>
            </div>
            {versionHistory.slice().map((_, index, arr) => (
              <div key={arr[arr.length - 1 - index].time} className="restore-presentation-item">
                <input
                  type="radio"
                  name="presentationRestore"
                  onKeyDown={handleKeyDown}
                  value={arr[arr.length - 1 - index].id}
                  checked={selectedVersion === arr[arr.length - 1 - index].time}
                  onChange={() => handleRadioChange(arr[arr.length - 1 - index].time)}
                />
                <label className="presentation-label">
                  {formattedDateTime(arr[arr.length - 1 - index].time)}
                </label>
              </div>
            ))}

          </div>
        )}
        <button className="submit-presentation-modal-button submit-form-button white-background-grey-text-button">Submit</button>
      </form>
    </div>
  );
}

export default RevisionHistoryModal;
