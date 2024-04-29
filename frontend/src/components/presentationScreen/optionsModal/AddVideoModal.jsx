import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { fileToDataUrl } from '../../../utility/fileToData';

function AddVideoModal ({ presentation, currentSlideNumInt, setPresentation, setOptionsModalState, isEditing, selectedElementID }) {
  const getContent = (field) => {
    if (field === 'autoplay' && !isEditing) {
      return false;
    } else if (field === 'url' && !isEditing) {
      return '';
    } else if (field === 'width' && !isEditing) {
      return '0.3';
    } else if (field === 'height' && !isEditing) {
      return '0.3';
    } else if (field === 'isFile' && !isEditing) {
      return false;
    }
    for (const content of presentation.slides[currentSlideNumInt].content) {
      if (content.contentId === selectedElementID) {
        if (field === 'autoplay') {
          return content.autoplay;
        } else if (field === 'url') {
          return content.url;
        } else if (field === 'width') {
          return content.width;
        } else if (field === 'height') {
          return content.height;
        } else if (field === 'isFile') {
          return content.isFile;
        }
      }
    }
  }

  const [isFile, setIsFile] = useState(false);
  const isFileRef = useRef(isFile); // alwasys have the latest version
  const [previewFile, setPreviewFile] = useState(getContent('isFile'));
  console.log(previewFile)
  const [autoplay, setAutoplay] = useState(getContent('autoplay'));
  const [url, setUrl] = useState(getContent('url'));
  const isMounted = useRef(false);

  const handleFileChange = async (event) => {
    const fileNew = event.target.files[0];
    const dataUrl = await fileToDataUrl(fileNew);
    console.log(dataUrl); // Log to check the data URL
    setUrl(dataUrl);
  };

  useEffect(() => {
    isFileRef.current = isFile;
  }, [isFile]);

  useEffect(() => {
    if (isMounted.current) {
      console.log('ran');
      if (isFileRef.current) {
        console.log('setting preview file');
        setPreviewFile(true);
        return;
      }
      setPreviewFile(false);
    } else {
      isMounted.current = true;
    }
  }, [url]);

  const width = getContent('width');
  const height = getContent('height')

  const handleEditVideo = () => {
    let contentIndex;
    let currentLeft;
    let currentTop;
    let contentId;

    for (const content of presentation.slides[currentSlideNumInt].content) {
      if (content.contentId === selectedElementID) {
        contentIndex = content.contentNum - 1;
        currentLeft = content.positionLeft;
        currentTop = content.positionTop;
        contentId = content.contentId;
      }
    }

    const textBox = {
      contentId,
      contentNum: contentIndex + 1,
      type: 'video',
      autoplay,
      url,
      height,
      width,
      positionLeft: currentLeft,
      positionTop: currentTop,
      isFile: previewFile
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
      return {
        ...prevPresentation,
        slides: updatedSlides
      };
    });
    setOptionsModalState('none');
  }

  const handleSubmitAddVideo = () => {
    const textBox = {
      contentId: uuidv4(),
      contentNum: presentation.slides[currentSlideNumInt].content.length + 1,
      type: 'video',
      autoplay,
      url,
      height: parseFloat(height),
      width: parseFloat(width),
      positionLeft: 0,
      positionTop: 0,
      isFile: previewFile
    };

    setPresentation(prevPresentation => {
      const updatedSlides = prevPresentation.slides.map(slide => {
        if (slide.slideNum === (currentSlideNumInt + 1)) {
          return {
            ...slide,
            content: [...slide.content, textBox],
          };
        }
        return slide
      });
      return {
        ...prevPresentation,
        slides: updatedSlides
      };
    });
    setOptionsModalState('none');
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  };

  const handleExitModal = (event) => {
    event.preventDefault();
    setOptionsModalState('none');
  }

  const getFormTypeTitle = () => {
    if (isEditing) {
      return 'Edit';
    } else {
      return 'Add';
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
      handleEditVideo();
    } else {
      handleSubmitAddVideo();
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

  const getFileTypeTitle = () => {
    if (!isFile) {
      return 'Youtube URL:';
    } else {
      return 'File:';
    }
  }

  const getEmbededUrl = () => {
    try {
      const urlObj = new URL(url);
      const videoId = new URLSearchParams(urlObj.search).get('v');
      if (videoId) {
        const loopParam = 'loop=1';
        const playlistParam = `playlist=${videoId}`;
        const formattedUrl = `https://www.youtube.com/embed/${videoId}?${loopParam}&${playlistParam}`;
        return formattedUrl;
      } else {
        throw new Error('Invalid YouTube URL or missing video ID');
      }
    } catch (error) {
      return '';
    }
  }

  const renderVideoContent = () => {
    if (!previewFile) {
      return (
        <iframe
            src={getEmbededUrl()}
            title="Embedded YouTube Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
      );
    } else {
      console.log('here')
      return (
        <video src={url} controls title="Video preview">
          Your browser does not support the video tag.
        </video>
      );
    }
  };

  return (
    <div className='presentation-modal dark-background-colour-theme'>
      <form onSubmit={handleSubmit}>
        <button className="close-presentation-modal-button" onClick={handleExitModal}>Exit</button>
        <h2><span>{getFormTypeTitle()}</span> Video Form</h2>
        <label className='form-labels' >Autoplay:</label>
        <div className="radio-container">
          <label className='radio-button'>
            <input
              type="radio"
              id="autosave-yes"
              name="autoplay"
              value="yes"
              onChange={() => setAutoplay(true)}
              checked={autoplay}
              onKeyDown={handleKeyDown}
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
              onKeyDown={handleKeyDown}
            />
            No
          </label>
        </div>
        <label className='form-labels'>Type:</label>
        <div className="radio-container">
        <label className='radio-button'>
          <input
            type="radio"
            name="source"
            value="url"
            onChange={() => setIsFile(false)}
            checked={!isFile}
          />
          Youtube URL
        </label>
        <label className='radio-button'>
          <input
            type="radio"
            name="source"
            value="file"
            onChange={() => setIsFile(true)}
            checked={isFile}
          />
          File
        </label>
      </div>
        <label className='form-labels' >{getFileTypeTitle()}</label>
        {isFile
          ? (<input
            className="video-input"
            onChange={handleFileChange}
            name="videoInput"
            accept="video/mp4, video/webm, video/ogg"
            type="file"
          />)
          : (<input onKeyDown={handleKeyDown} className="form-inputs" onChange={handleUrlChange} placeholder='Enter a url...' type="url"></input>)
        }
        <div className="presentation-modal-2d-element">
          {renderVideoContent()}
        </div>
        <button type='submit' className='auth-submit-button white-background-grey-text-button' >{getFormTypeButton()}</button>
      </form>
    </div>
  );
}

export default AddVideoModal;
