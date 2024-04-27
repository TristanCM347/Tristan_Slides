import React, { useState, useEffect } from 'react';
import { fileToDataUrl } from '../../../utility/fileToData';

function AddImageModal ({ presentation, currentSlideNumInt, setPresentation, setOptionsModalState, isEditing }) {
  const getContent = (field) => {
    if (field === 'description' && !isEditing) {
      return '';
    } else if (field === 'url' && !isEditing) {
      return '';
    } else if (field === 'width' && !isEditing) {
      return '0.3';
    } else if (field === 'height' && !isEditing) {
      return '0.3';
    }
    for (const content of presentation.slides[currentSlideNumInt].content) {
      console.log('in loop')
      if (content.isEdit === true) {
        console.log('found edit')
        if (field === 'description') {
          return content.description;
        } else if (field === 'url') {
          return content.url;
        } else if (field === 'width') {
          return content.width;
        } else if (field === 'height') {
          return content.height;
        }
      }
    }
  }

  const [description, setDescription] = useState(getContent('description'));
  const [selectedFile, setSelectedFile] = useState(getContent('url'));
  const handleFileChange = async (event) => {
    const fileNew = event.target.files[0];
    setSelectedFile(await fileToDataUrl(fileNew));
    console.log(fileNew, selectedFile)
  };

  const handleUrlChange = async (event) => {
    const fileNew = event.target.value
    setSelectedFile(await fileToDataUrl(fileNew));
    console.log(fileNew, selectedFile)
  };

  const width = getContent('width');
  const height = getContent('height')
  const positionLeft = 0;
  const positionTop = 0;

  const handleEditImage = async () => {
    let contentIndex;
    let currentLeft;
    let currentTop;

    for (const content of presentation.slides[currentSlideNumInt].content) {
      if (content.isEdit === true) {
        contentIndex = content.contentNum - 1;
        currentLeft = content.positionLeft;
        currentTop = content.positionTop;
      }
    }

    const textBox = {
      contentNum: contentIndex + 1,
      type: 'image',
      description,
      url: selectedFile,
      height,
      width,
      positionLeft: currentLeft,
      positionTop: currentTop,
      zIndex: presentation.slides[currentSlideNumInt].content.length,
      isEdit: false,
    };

    setPresentation(prevPresentation => {
      const newContent = [...presentation.slides[currentSlideNumInt].content];
      console.log(newContent)
      newContent[contentIndex] = textBox;
      console.log(newContent)
      const updatedSlides = prevPresentation.slides.map(slide => {
        if (slide.slideNum === (currentSlideNumInt + 1)) {
          return {
            ...slide,
            content: newContent
          };
        }
        return slide
      });
      console.log(updatedSlides)
      return {
        ...prevPresentation,
        slides: updatedSlides
      };
    });
    console.log(presentation)
    setOptionsModalState('none');
  }

  const handleSubmitAddImage = async (event) => {
    const textBox = {
      contentNum: presentation.slides[currentSlideNumInt].content.length + 1,
      type: 'image',
      description,
      url: selectedFile,
      height: parseFloat(height),
      width: parseFloat(width),
      positionLeft,
      positionTop,
      isEdit: false,
    };
    console.log(textBox, presentation);

    setPresentation(prevPresentation => {
      const updatedSlides = prevPresentation.slides.map(slide => {
        console.log(slide.slideNum, currentSlideNumInt)
        if (slide.slideNum === (currentSlideNumInt + 1)) {
          return {
            ...slide,
            content: [...slide.content, textBox],
          };
        }
        return slide
      });
      console.log(updatedSlides)
      return {
        ...prevPresentation,
        slides: updatedSlides
      };
    });
    console.log(presentation)
    setOptionsModalState('none');
  }

  const handleTextBox = (event) => {
    setDescription(event.target.value);
  }
  const [isFile, setIsFile] = useState(true);

  const handleExitModal = () => {
    setOptionsModalState('none');
  }

  const getFormTypeTitle = () => {
    if (isEditing) {
      return 'Edit';
    } else {
      return 'Add';
    }
  }

  const getFileTypeTitle = () => {
    if (isFile) {
      return 'URL:';
    } else {
      return 'File:';
    }
  }

  const getFormTypeButton = () => {
    if (isEditing) {
      return 'Change';
    } else {
      return 'Submit';
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isEditing) {
      handleEditImage();
    } else {
      handleSubmitAddImage();
    }
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
      handleExitModal(event);
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
        <button className="close-presentation-modal-button" onClick={handleExitModal}>Exit</button>
        <h2><span>{getFormTypeTitle()}</span> Image Form</h2>
        <label className='form-labels' >Description:</label>
        <textarea className="slide-textbox form-inputs"
          value={description}
          onChange={handleTextBox}
          placeholder="Description of image for alt tag"
          rows="2"
          onKeyDown={handleKeyDown}
        ></textarea>
        <label className='form-labels'>Type:</label>
        <div>
          <label className='radio-button'>
            <input
              type="radio"
              id="url"
              name="source"
              value="url"
              onChange={() => setIsFile(true)}
              checked={isFile}
              onKeyDown={handleKeyDown}
            />
            URL
          </label>
          <label className='radio-button'>
            <input
              type="radio"
              id="file"
              name="source"
              value="file"
              onChange={() => setIsFile(false)}
              checked={!isFile}
              onKeyDown={handleKeyDown}
            />
            File
          </label>
        </div>
        <label className='form-labels'>{getFileTypeTitle()}</label>
        {!isFile
          ? (<input onKeyDown={handleKeyDown} onChange={handleFileChange} className='thumbnail-input ' name="imageInput" accept="image/jpeg, image/png, image/jpg" type="file"></input>)
          : (<input onKeyDown={handleKeyDown} onChange={handleUrlChange} className='form-inputs' placeholder='Enter a url...' name="imageInput" type="url"></input>)
        }

        <button type='submit' className='auth-submit-button white-background-grey-text-button' >{getFormTypeButton()}</button>
      </form>
    </div>
  );
}

export default AddImageModal;
