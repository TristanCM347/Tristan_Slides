import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import '../../../styles/presentationModal.css';
import { v4 as uuidv4 } from 'uuid';

function AddCodeModal ({ presentation, currentSlideNumInt, setPresentation, setOptionsModalState, isEditing, selectedElementID }) {
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
      if (content.contentId === selectedElementID) {
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
  const [fontSize, setFontSize] = useState(getContent('font-size'))
  const [language, setLanguage] = useState(getContent('language'));

  const detectLanguage = (code) => {
    if (code.includes('const') || code.includes('console.log')) {
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
      type: 'code',
      code,
      language,
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

  const handleSubmitAddCode = () => {
    const textBox = {
      contentId: uuidv4(),
      contentNum: presentation.slides[currentSlideNumInt].content.length + 1,
      type: 'code',
      code,
      language,
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

  const handleEditorChange = (value, event) => {
    const newLanguage = detectLanguage(value);
    setLanguage(newLanguage);
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
          className="monaco-modal"
          onChange={handleEditorChange}
          language={language}
          defaultValue={code}
          theme="vs-dark"
          options={{
            lineNumbers: 'on',
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            scrollbar: { vertical: 'auto', horizontal: 'auto' },
            glyphMargin: false,
            folding: false,
            overviewRulerBorder: false,
            overviewRulerLanes: 0,
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
