import React, { useState, useEffect } from 'react';

function AddTextModal ({ presentation, currentSlideNumInt, setPresentation, setOptionsModalState, isEditing }) {
  console.log('text modal rendeed');

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
      console.log('in loop')
      if (content.isEdit === true) {
        console.log('found edit')
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
  const height = getContent('height')
  const positionLeft = 0;
  const positionTop = 0;

  const handleEditText = () => {
    console.log(description, colour, font, fontSize, presentation.slides[currentSlideNumInt].content);
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
    console.log(colour, font, fontSize)
    const textBox = {
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

  const handleSubmitAddText = () => {
    console.log('called', description, colour, font, fontSize);
    const textBox = {
      contentNum: presentation.slides[currentSlideNumInt].content.length + 1,
      type: 'text',
      description,
      colour,
      font,
      fontSize,
      height: parseFloat(height),
      width: parseFloat(width),
      positionLeft,
      positionTop,
      zIndex: presentation.slides[currentSlideNumInt].content.length,
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
