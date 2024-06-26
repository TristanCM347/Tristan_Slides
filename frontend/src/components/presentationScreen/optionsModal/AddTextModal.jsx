import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

function AddTextModal ({ presentation, currentSlideNumInt, setPresentation, setOptionsModalState, isEditing, selectedElementID }) {
  const getContent = (field) => {
    if (field === 'description' && !isEditing) {
      return '';
    } else if (field === 'colour' && !isEditing) {
      return '#000000';
    } else if (field === 'font' && !isEditing) {
      return 'Ariel';
    } else if (field === 'font-size' && !isEditing) {
      return '1';
    } else if (field === 'width' && !isEditing) {
      return '0.3';
    } else if (field === 'height' && !isEditing) {
      return '0.3';
    }
    for (const content of presentation.slides[currentSlideNumInt].content) {
      if (content.contentId === selectedElementID) {
        if (field === 'description') {
          return content.description;
        } else if (field === 'colour') {
          return content.colour;
        } else if (field === 'font') {
          return content.font;
        } else if (field === 'font-size') {
          return content.fontSize;
        } else if (field === 'width') {
          return content.width;
        } else if (field === 'height') {
          return content.height;
        }
      }
    }
  }

  const [description, setDescription] = useState(getContent('description'));
  const [colour, setColour] = useState(getContent('colour'));
  const [font, setFont] = useState(getContent('font'));
  const [fontSize, setFontSize] = useState(getContent('font-size'))
  const width = getContent('width');
  const height = getContent('height');

  const handleEditText = () => {
    let contentIndex;
    let currentLeft;
    let currentTop;
    let contentId;

    for (const content of presentation.slides[currentSlideNumInt].content) {
      if (selectedElementID === content.contentId) {
        contentIndex = content.contentNum - 1;
        currentLeft = content.positionLeft;
        currentTop = content.positionTop;
        contentId = content.contentId;
      }
    }
    const textBox = {
      contentId,
      contentNum: contentIndex + 1,
      type: 'text',
      description,
      colour,
      font,
      fontSize,
      height,
      width,
      positionLeft: currentLeft,
      positionTop: currentTop,
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

  const handleSubmitAddText = () => {
    const textBox = {
      contentId: uuidv4(),
      contentNum: presentation.slides[currentSlideNumInt].content.length + 1,
      type: 'text',
      description,
      colour,
      font,
      fontSize,
      height: parseFloat(height),
      width: parseFloat(width),
      positionLeft: 0,
      positionTop: 0,
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

  const handleTextBox = (event) => {
    setDescription(event.target.value);
  }

  const handleColour = (event) => {
    setColour(event.target.value);
  }

  const handleFont = (event) => {
    setFont(event.target.value);
  }

  const handleFontSize = (event) => {
    setFontSize(event.target.value);
  }

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

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isEditing) {
      handleEditText();
    } else {
      handleSubmitAddText();
    }
  }

  const getFormTypeButton = () => {
    if (isEditing) {
      return 'Change';
    } else {
      return 'Submit';
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

  return (
    <div className='presentation-modal dark-background-colour-theme'>
      <form onSubmit={handleSubmit}>
        <button className="close-presentation-modal-button" onClick={handleExitModal}>Exit</button>
        <h2><span>{getFormTypeTitle()}</span> Text Form</h2>
        <label className='form-labels' htmlFor="slide-textbox">Slide Textbox:</label>
        <textarea className="slide-textbox form-inputs"
          value={description}
          required
          onChange={handleTextBox}
          placeholder="Enter textbox content"
          rows="2"
          onKeyDown={handleKeyDown}
        ></textarea>
        <label className='form-labels' htmlFor="textbox-color">Text Color:</label>
        <input className="form-color" type="color" id="textbox-colour" value={colour} onKeyDown={handleKeyDown} onChange={handleColour}/>
        <label className='form-labels' htmlFor="font">Font:</label>
        <select className="font form-inputs option-inputs" onChange={handleFont} value={font} onKeyDown={handleKeyDown}>
          <option value="Arial">Arial</option>
          <option value="Helvetica">Helvetica</option>
          <option value="Times New Roman">Times New Roman</option>
        </select>
        <label className='form-labels' htmlFor="font-size">Font size (em):</label>
        <input onChange={handleFontSize} value={fontSize} id='font-size' type="text" placeholder='font size' className=' form-inputs' onKeyDown={handleKeyDown}/>
        <button type='submit' className='auth-submit-button white-background-grey-text-button' >{getFormTypeButton()}</button>
      </form>
    </div>
  );
}

export default AddTextModal;
