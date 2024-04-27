import React, { useState, useEffect } from 'react';
import { authAPICall } from '../../utility/apiCalls';
import { fileToDataUrl } from '../../utility/fileToData';
import { createNewPresentation } from '../../utility/data';
import '../../styles/dashboard.css';
import '../../styles/presentationModal.css';

import GREY_THUMBNAIL from './thumbnail/grey.jpeg';

function NewPresentationModal ({ isNewModalShown, updateModalState, hideNewModal, hideUpdateModal }) {
  if (!isNewModalShown && !updateModalState.visibility) {
    return null;
  }

  const initialPresentationName = () => {
    if (isNewModalShown) {
      return '';
    } else if (updateModalState.visibility) {
      return updateModalState.presentation.name;
    }
  }

  const initialPresentationDescription = () => {
    if (isNewModalShown) {
      return '';
    } else if (updateModalState.visibility) {
      return updateModalState.presentation.description;
    }
  }

  const [selectedFile, setSelectedFile] = useState('');

  const handleNameChange = (event) => {
    const name = event.target.value;
    setPresentationName(name);
  };

  const handleDescriptionChange = (event) => {
    const description = event.target.value;
    setPresentationDescription(description);
  }

  const handleFileChange = (event) => {
    const fileNew = event.target.files[0];
    setSelectedFile(fileNew);
  };

  const getInitialImagePreviewUrl = () => {
    if (isNewModalShown) {
      return GREY_THUMBNAIL;
    } else if (updateModalState.visibility) {
      return updateModalState.presentation.thumbnailUrl
    }
  }

  const [imagePreviewUrl, setImagePreviewUrl] = useState(() => getInitialImagePreviewUrl());
  const [presentationName, setPresentationName] = useState(initialPresentationName());
  const [presentationDescription, setPresentationDescription] = useState(initialPresentationDescription());

  const closeModal = (event) => {
    event.preventDefault();
    if (isNewModalShown) {
      hideNewModal();
    } else if (updateModalState.visibility) {
      hideUpdateModal();
    }
  }

  const handlePreviewButton = async (event) => {
    event.preventDefault();
    if (selectedFile) {
      try {
        const imageURL = await fileToDataUrl(selectedFile);
        setImagePreviewUrl(imageURL);
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  const handleSubmitNewPresentation = async (event) => {
    event.preventDefault();
    let url;

    if (selectedFile !== '') {
      url = await fileToDataUrl(selectedFile);
    } else {
      if (isNewModalShown) {
        url = GREY_THUMBNAIL;
      } else if (updateModalState.visibility) {
        url = updateModalState.presentation.thumbnailUrl;
      }
    }

    let data;
    try {
      data = await authAPICall('store', 'GET', localStorage.getItem('token'));
    } catch (error) {
      console.error('Error making API call:', error);
      return;
    }
    if (data.data && data.data.error) {
      console.error('Error in response data:', data.data.error);
      return;
    }

    if (isNewModalShown) {
      data.store.presentations.push(createNewPresentation(presentationName, presentationDescription, url));
      data.store.numPresentations += 1;
    } else if (updateModalState.visibility) {
      const index = data.store.presentations.findIndex(storedPresentation => storedPresentation.id === updateModalState.presentation.id);
      if (index !== -1) {
        data.store.presentations[index].name = presentationName;
        data.store.presentations[index].description = presentationDescription;
        data.store.presentations[index].thumbnailUrl = url;
      } else {
        console.error('Presentation not found');
      }
    }

    try {
      data = await authAPICall('store', 'PUT', localStorage.getItem('token'), JSON.stringify(data));
    } catch (error) {
      console.error('Error making API call:', error);
      return;
    }
    if (data.data && data.data.error) {
      console.error('Error in response data:', data.data.error);
    }

    if (isNewModalShown) {
      hideNewModal();
    } else if (updateModalState.visibility) {
      hideUpdateModal();
    }
  }

  const getFormTypeTitle = () => {
    if (isNewModalShown) {
      return 'New';
    } else if (updateModalState.visibility) {
      return 'Edit';
    }
  }

  const getFormTypeButton = () => {
    if (isNewModalShown) {
      return 'Create';
    } else if (updateModalState.visibility) {
      return 'Change';
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (event.target.form.checkValidity()) {
        handleSubmitNewPresentation(event);
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
      <form onSubmit={handleSubmitNewPresentation}>
        <button className="close-presentation-modal-button" type='button' onClick={closeModal}>Exit</button>
        <h2><span>{getFormTypeTitle()}</span> Presentation Form</h2>
        <label className='form-labels' htmlFor="presentation-name">Name:</label>
        <input onChange={handleNameChange} onKeyDown={handleKeyDown} type="text" className='form-inputs' id="presentation-name" name="presentationName" placeholder="Enter presentation name" defaultValue={initialPresentationName()} required></input>
        <label className='form-labels' htmlFor="presentationDescription">Description:</label>
        <textarea
          onChange={handleDescriptionChange}
          className='form-inputs presentation-description'
          name="presentationDescription"
          placeholder="Enter presentation description"
          defaultValue={initialPresentationDescription()}
          onKeyDown={handleKeyDown}
          rows="2"
        ></textarea>
        <label className='form-labels' htmlFor="thumbnail-input">Thumbnail:</label>
        <div className="thumbnail-preview-container">
          <div className="thumbnail-image-container">
            <img src={imagePreviewUrl} alt="Presenation Thumbnail"></img>
          </div>
          <button className="preview-thumbnail-button" onClick={handlePreviewButton} >Preview Thumbnail</button>
        </div>
        <input className="thumbnail-input" onKeyDown={handleKeyDown} onChange={handleFileChange} name="profilePictureInput" accept="image/jpeg, image/png, image/jpg" type="file"></input>
        <button type='submit' id='submit-presentation-button-id' className="submit-presentation-modal-button submit-form-button white-background-grey-text-button" > {getFormTypeButton()}</button>
      </form>
    </div>
  );
}

export default NewPresentationModal;
