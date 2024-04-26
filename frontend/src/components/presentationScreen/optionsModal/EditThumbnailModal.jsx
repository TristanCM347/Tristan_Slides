import React, { useState, useEffect } from 'react';
import '../../../styles/loginRegister.css';
import { fileToDataUrl } from '../../../utility/fileToData';

function EditThumbnailModal ({ setOptionsModalState, presentation, setPresentation }) {
  const initialThumnailUrl = () => {
    return presentation.thumbnailUrl;
  }

  const [selectedFile, setSelectedFile] = useState('');
  const [imagePreviewUrl, setImagePreviewUrl] = useState(() => initialThumnailUrl());

  const handleFileChange = (event) => {
    const fileNew = event.target.files[0];
    setSelectedFile(fileNew);
    console.log(fileNew, selectedFile)
  };

  const closeModal = (event) => {
    event.preventDefault();
    setOptionsModalState('none');
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

  const handleEditThumbnail = async () => {
    if (selectedFile !== '') {
      const url = await fileToDataUrl(selectedFile);
      setPresentation(prevPresentation => ({
        ...prevPresentation,
        thumbnailUrl: url
      }));
    }
    setOptionsModalState('none');
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (event.target.form.checkValidity()) {
        handleEditThumbnail(event);
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
      <form onSubmit={handleEditThumbnail}>
        <button className="close-presentation-modal-button" onClick={closeModal}>Exit</button>
        <h2>Edit Thumbnail Form</h2>
        <p>This wont save automatically</p>
        <label className='form-labels'>Old Thumbnail:</label>
        <div className="thumbnail-preview-container">
            <div className="thumbnail-image-container">
              <img src={initialThumnailUrl()} alt="Old Presenation Thumbnail"></img>
            </div>
        </div>
        <label className='form-labels'>New Thumbnail:</label>

        <div className="thumbnail-preview-container">
            <div className="thumbnail-image-container">
              <img src={imagePreviewUrl} alt="Presenation Thumbnail"></img>
            </div>
            <button className="preview-thumbnail-button" onClick={handlePreviewButton} >Preview Thumbnail</button>
        </div>
        <input className="thumbnail-input" onKeyDown={handleKeyDown} onChange={handleFileChange} name="profilePictureInput" accept="image/jpeg, image/png, image/jpg" type="file"></input>
        <button className='auth-submit-button white-background-grey-text-button' >Submit</button>
      </form>
    </div>
  );
}

export default EditThumbnailModal;
