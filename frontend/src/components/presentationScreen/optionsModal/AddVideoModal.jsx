import React, { useState } from 'react';
import { fileToDataUrl } from '../../../utility/fileToData';

function AddVideoModal ({ presentation, currentSlideNumInt, setPresentation, setOptionsModalState, isEditing }) {
  const getContent = (field) => {
    if (field === 'autoplay' && !isEditing) {
      return false;
    } else if (field === 'url' && !isEditing) {
      return '';
    } else if (field === 'width' && !isEditing) {
      return '0.3';
    } else if (field === 'height' && !isEditing) {
      return '0.3';
    }
    for (const content of presentation.slides[currentSlideNumInt].content) {
      if (content.isEdit === true) {
        if (field === 'autoplay') {
          return content.autoplay;
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

  const [autoplay, setAutoplay] = useState(getContent('autoplay'));
  const [selectedFile, setSelectedFile] = useState(getContent('url'));

  const handleFileChange = async (event) => {
    const fileNew = event.target.files[0];
    setSelectedFile(await fileToDataUrl(fileNew));
  };
  const width = getContent('width');
  const height = getContent('height')
  const positionLeft = 0;
  const positionTop = 0;

  const handleEditVideo = async () => {
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
      type: 'video',
      autoplay,
      url: selectedFile,
      height,
      width,
      positionLeft: currentLeft,
      positionTop: currentTop,
      isEdit: false,
    };

    setPresentation(prevPresentation => {
      const newContent = [...presentation.slides[currentSlideNumInt].content];
      newContent[contentIndex] = textBox;
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
    setOptionsModalState('none');
  }

  const handleSubmitAddVideo = async (event) => {
    const textBox = {
      contentNum: presentation.slides[currentSlideNumInt].content.length + 1,
      type: 'video',
      autoplay,
      url: selectedFile,
      height: parseFloat(height),
      width: parseFloat(width),
      positionLeft,
      positionTop,
      zIndex: presentation.slides[currentSlideNumInt].content.length,
      isEdit: false,
    };

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
    setOptionsModalState('none');
  }

  const handleUrlChange = async (event) => {
    const fileNew = event.target.value
    setSelectedFile(await fileToDataUrl(fileNew));
    console.log(fileNew, selectedFile)
  };

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

  return (
    <div className='presentation-modal dark-background-colour-theme'>
      <button className="close-presentation-modal-button" onClick={handleExitModal}>Exit</button>
      <h2><span>{getFormTypeTitle()}</span> Video Form</h2>
      <label className='form-labels' >Autoplay:</label>
      <div>
        <label className='radio-button'>
          <input
            type="radio"
            id="autosave-yes"
            name="autoplay"
            value="yes"
            onChange={() => setAutoplay(true)}
            checked={autoplay}
          />
          Yes
        </label>
        <label className='radio-button'>
          <input
            type="radio"
            id="autosave-no"
            name="autoplay"
            value="no"
            onChange={() => setAutoplay(false)}
            checked={!autoplay}
          />
          No
        </label>
      </div>
      <label className='form-labels'>Type:</label>
      <div>
        <label className='radio-button'>
          <input
            type="radio"
            name="source"
            value="url"
            onChange={() => setIsFile(true)}
            checked={isFile}
          />
          URL
        </label>
        <label className='radio-button'>
          <input
            type="radio"
            name="source"
            value="file"
            onChange={() => setIsFile(false)}
            checked={!isFile}
          />
          File
        </label>
      </div>
      <label className='form-labels' >{getFileTypeTitle()}</label>
      {!isFile
        ? (<input
            className="video-input"
            onChange={handleFileChange}
            name="videoInput"
            accept="video/mp4, video/webm, video/ogg"
            type="file"
          />)
        : (<input className="thumbnail-input form-inputs" onChange={handleUrlChange} placeholder='Enter a url...' name="imageInput" type="url"></input>)
      }
      {!isEditing
        ? (<button className='auth-submit-button white-background-grey-text-button' onClick={handleSubmitAddVideo}>Submit</button>)
        : (<button className='auth-submit-button white-background-grey-text-button' onClick={handleEditVideo}>Edit</button>)
      }
    </div>
  );
}

export default AddVideoModal;
