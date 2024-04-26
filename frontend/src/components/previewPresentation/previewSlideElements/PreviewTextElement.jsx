import React, { useState, useEffect } from 'react';
import '../../../styles/slideElements.css'

function PreviewTextElement ({ key, content, width, height }) {
  const [slideSize, setSlideSize] = useState({ x: width, y: height });

  console.log(content)
  useEffect(() => {
    setSlideSize({
      x: width,
      y: height
    });
  }, [width, height]);

  return (
    <div
      className='slide-element-container'
      style={{
        left: `${content.positionLeft * 100}%`,
        top: `${content.positionTop * 100}%`,
        width: `${content.width * slideSize.x}px`,
        height: `${content.height * slideSize.y}px`,
      }}
    >
      <div
        className='slide-element-content'
        style={{
          zIndex: content.contentNum,
          color: content.colour,
          fontFamily: content.font,
          fontSize: `${content.fontSize}em`,
        }}>
        <p className='text-element'>{content.description}</p>
      </div>
    </div>
  );
}

export default PreviewTextElement;
