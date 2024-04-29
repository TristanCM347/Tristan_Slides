import React, { useState, useEffect } from 'react';
import '../../../../styles/slideElements.css'
import { Rnd } from 'react-rnd';

function TextElement ({ content, setOptionsModalState, setPresentation, width, height, currentSlideNumInt, presentation, selectedElementID, setSelectedElementID }) {
  const [slideSize, setSlideSize] = useState({ x: width, y: height });
  const [isSelected, setIsSelected] = useState(selectedElementID === content.contentId);

  useEffect(() => {
    setIsSelected(selectedElementID === content.contentId);
  }, [selectedElementID, content.contentId]);

  useEffect(() => {
    setSlideSize({
      x: width,
      y: height
    });
  }, [width, height]);

  const handleEditText = () => {
    setOptionsModalState('slide-edit-text');
  };

  const handleResizeStart = (e) => {
    e.stopPropagation();
  };

  const handleDragStart = (e) => {
    e.stopPropagation();
  };

  const onResizeStop = (e, direction, ref, delta, position) => {
    const newWidth = parseFloat(ref.style.width) / slideSize.x;
    const newHeight = parseFloat(ref.style.height) / slideSize.y;
    const newLeft = position.x / slideSize.x;
    const newTop = position.y / slideSize.y;

    setPresentation(prevPresentation => {
      const newContent = prevPresentation.slides[currentSlideNumInt].content.map(contentItem => {
        if (contentItem.contentNum === content.contentNum) {
          return {
            ...contentItem,
            width: newWidth,
            height: newHeight,
            positionTop: newTop,
            positionLeft: newLeft,
          };
        } else {
          return contentItem;
        }
      });
      const newSlides = prevPresentation.slides.map(slide => {
        if (slide.slideNum === (currentSlideNumInt + 1)) {
          return {
            ...slide,
            content: newContent,
          };
        }
        return slide
      });

      return {
        ...prevPresentation,
        slides: newSlides,
      };
    });
  }

  const onDragStop = (e, d) => {
    const newLeft = d.x / slideSize.x;
    const newTop = d.y / slideSize.y;

    setPresentation(prevPresentation => {
      const newContent = prevPresentation.slides[currentSlideNumInt].content.map(contentItem => {
        if (contentItem.contentNum === content.contentNum) {
          return {
            ...contentItem,
            positionLeft: newLeft,
            positionTop: newTop,
          };
        } else {
          return contentItem;
        }
      });
      const newSlides = prevPresentation.slides.map(slide => {
        if (slide.slideNum === (currentSlideNumInt + 1)) {
          return {
            ...slide,
            content: newContent,
          };
        }
        return slide
      });

      return {
        ...prevPresentation,
        slides: newSlides,
      };
    })
  };

  const handleDeleteElemenet = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setPresentation(prevPresentation => {
      const newContent = prevPresentation.slides[currentSlideNumInt].content.reduce((acc, contentItem) => {
        if (contentItem.contentNum === content.contentNum) {
          return acc;
        }
        if (contentItem.contentNum > content.contentNum) {
          acc.push({
            ...contentItem,
            contentNum: contentItem.contentNum - 1
          });
        } else {
          acc.push(contentItem);
        }
        return acc;
      }, []);

      const newSlides = prevPresentation.slides.map(slide => {
        if (slide.slideNum === (currentSlideNumInt + 1)) {
          return {
            ...slide,
            content: newContent,
          };
        }
        return slide
      });
      return {
        ...prevPresentation,
        slides: newSlides,
      };
    });
  }

  const selectedClass = isSelected ? 'selectedClass' : 'not-selectedClass';

  const handleSingleClick = (event) => {
    event.stopPropagation();
    if (!isSelected) {
      setSelectedElementID(content.contentId)
    }
  }

  return (
    <Rnd
      bounds={'parent'}
      position={{ x: `${content.positionLeft * slideSize.x}`, y: `${content.positionTop * slideSize.y}` }}
      className={`slide-element-container ${selectedClass}`}
      onClick={handleSingleClick}
      onDoubleClick={isSelected ? handleEditText : null}
      disableDragging={!isSelected}
      onResizeStart={handleResizeStart}
      onResizeStop={onResizeStop}
      onDragStart={isSelected ? handleDragStart : null}
      onDragStop={isSelected ? onDragStop : null}
      onContextMenu={isSelected ? handleDeleteElemenet : null}
      enableResizing={{
        top: false,
        right: false,
        bottom: false,
        left: false,
        topRight: isSelected,
        bottomRight: isSelected,
        bottomLeft: isSelected,
        topLeft: isSelected
      }}
      resizeHandleStyles={{
        topLeft: { width: '8px', height: '8px', top: '-4px', left: '-4px', backgroundColor: '#6495ed' },
        topRight: { width: '8px', height: '8px', top: '-4px', right: '-4px', backgroundColor: '#6495ed' },
        bottomLeft: { width: '8px', height: '8px', bottom: '-4px', left: '-4px', backgroundColor: '#6495ed' },
        bottomRight: { width: '8px', height: '8px', bottom: '-4px', right: '-4px', backgroundColor: '#6495ed' }
      }}
      style={{
        maxWidth: (slideSize.x - (content.positionLeft * slideSize.x)),
        maxHeight: (slideSize.y - (content.positionTop * slideSize.y)),
        minWidth: (slideSize.x * 0.01),
        minHeight: (slideSize.y * 0.01)
      }}
      size={{ width: `${content.width * slideSize.x}`, height: `${content.height * slideSize.y}` }}
    >
      <div
      className='slide-element-content'
      style={{
        maxWidth: slideSize.x,
        maxHeight: slideSize.y,
        zIndex: content.contentNum,
        color: content.colour,
        fontFamily: content.font,
        fontSize: `${content.fontSize}em`,
      }}>
        <p className='text-element'>{content.description}</p>
      </div>
    </Rnd>
  );
}

export default TextElement;
