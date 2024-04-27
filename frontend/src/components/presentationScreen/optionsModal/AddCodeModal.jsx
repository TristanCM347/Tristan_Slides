import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import '../../../styles/presentationModal.css';

function AddCodeModal ({ presentation, currentSlideNumInt, setPresentation, setOptionsModalState, isEditing }) {
  const getContent = (field) => {
    if (field === 'code' && !isEditing) {
      return '';
    } else if (field === 'width' && !isEditing) {
      return '0.3';
    } else if (field === 'height' && !isEditing) {
      return '0.3';
    } else if (field === 'language' && !isEditing) {
      return 'javascript';
    } else if (field === 'font-size' && !isEditing) {
      return '10';
    }
    for (const content of presentation.slides[currentSlideNumInt].content) {
      console.log('in loop')
      if (content.isEdit === true) {
        console.log('found edit')
        if (field === 'code') {
          return content.code;
        } else if (field === 'width') {
          return content.width;
        } else if (field === 'height') {
          return content.height;
        } else if (field === 'language') {
          return content.language;
        } else if (field === 'font-size') {
          return content.fontSize;
        }
      }
    }
  }

  const [code, setCode] = useState(getContent('code'));
  const width = getContent('width');
  const height = getContent('height')
  const positionLeft = 0;
  const positionTop = 0;
  const [fontSize, setFontSize] = useState(getContent('font-size'))
  const [language, setLanguage] = useState(getContent('language'));
  console.log(presentation.slides[currentSlideNumInt], isEditing)
  const detectLanguage = (code) => {
    if (code.includes('function') || code.includes('const') || code.includes('console.log')) {
      return 'javascript';
    } else if (code.includes('def')) {
      return 'python';
    } else if (code.includes('#include') || code.includes('int') || code.includes('printf')) {
      return 'c';
    }
  };

  const handleEditCode = () => {
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
      type: 'code',
      code,
      language,
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

  const handleSubmitAddCode = () => {
    const textBox = {
      contentNum: presentation.slides[currentSlideNumInt].content.length + 1,
      type: 'code',
      code,
      language,
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

  const handleEditorChange = (value, event) => {
    const newLanguage = detectLanguage(value);
    console.log(newLanguage);
    setLanguage(newLanguage);
    console.log(newLanguage, language);
    setCode(value)
  };

  const handleFontSize = (event) => {
    setFontSize(event.target.value);
  }

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

  const handleEscapePress = (event) => {
    if (event.key === 'Escape') {
      handleExitModal(event);
    }
  };

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
      handleEditCode();
    } else {
      handleSubmitAddCode();
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
        <h2><span>{getFormTypeTitle()}</span> Code Form</h2>
        <label className='form-labels' >Code Editor:</label>
        <div>
        <Editor
          className="custom-editor"
          onChange={handleEditorChange}
          language={language}
          defaultValue={code}
          theme="vs-dark"
          options={{
            lineNumbers: 'on',
            minimap: { enabled: false },
          }}
        />
        </div>
        <label className='form-labels' >Font size (em):</label>
        <input onKeyDown={handleKeyDown} onChange={handleFontSize} value={fontSize} className='font-size  form-inputs' type="text" placeholder='Font size' />
        <button type='submit' className='auth-submit-button white-background-grey-text-button' >{getFormTypeButton()}</button>
      </form>
    </div>
  );
}

export default AddCodeModal;
