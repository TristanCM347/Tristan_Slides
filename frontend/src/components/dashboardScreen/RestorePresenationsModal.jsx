import React, { useState, useEffect } from 'react';
import { authAPICall } from '../../utility/apiCalls';

import '../../styles/dashboard.css';
import '../../styles/presentationModal.css';

function RestorePresenationsModal ({ isNewModalShown, updateModalState, setIsRestoreModalShown }) {
  if (isNewModalShown || updateModalState.visibility) {
    return null;
  }

  const [store, setStore] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [deletedPresentations, setDeletedPresentations] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await authAPICall('store', 'GET', localStorage.getItem('token'));
        if (data.data && data.data.error) {
          console.error('Error in response data:', data.data.error);
          return;
        }
        setStore(data.store);
        setDeletedPresentations(data.store.presentations.filter(p => p.isDeleted))
      } catch (error) {
        console.error('Error making API call:', error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (deletedPresentations !== null) {
      setDataLoaded(true);
    }
  }, [deletedPresentations]);

  const handleCheckboxChange = (id) => {
    setSelectedIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!dataLoaded) {
      setIsRestoreModalShown(false);
      return;
    }

    const updatedStore = {
      ...store,
      presentations: store.presentations.map(p => ({
        ...p,
        isDeleted: selectedIds.includes(p.id) ? false : p.isDeleted
      })),
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
    setIsRestoreModalShown(false);
  }

  const closeModal = (event) => {
    event.preventDefault();
    setIsRestoreModalShown(false);
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
    <div className='presentation-modal dark-background-colour-theme'>
      <form onSubmit={handleSubmit}>
        <button className="close-presentation-modal-button" onClick={closeModal}>Exit</button>
        <h2> Restore Deleted Presentations Form </h2>
        {dataLoaded && deletedPresentations.length > 0 && (
          <div className="restore-presentation-form">
            {deletedPresentations.map(presentation => (
              <div key={presentation.id} className="restore-presentation-item">
              <input
                type="checkbox"
                onKeyDown={handleKeyDown}
                checked={selectedIds.includes(presentation.id)}
                onChange={() => handleCheckboxChange(presentation.id)}
              />
              <label className="presentation-label">
                {presentation.name}
              </label>
            </div>
            ))}
          </div>
        )}
        <button id="submit-presentation-modal-button" type="submit" className="submit-form-button white-background-grey-text-button" > Submit </button>
      </form>
    </div>
  );
}

export default RestorePresenationsModal;
