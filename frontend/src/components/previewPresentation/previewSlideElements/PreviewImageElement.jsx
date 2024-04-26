import React, { useState, useEffect } from 'react';
import '../../../styles/slideElements.css'

function PreviewImageElement ({ key, content, width, height }) {
  const [slideSize, setSlideSize] = useState({ x: width, y: height });

  console.log(content, slideSize)
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
        }}
      >
        <img
          className='image-element'
          src={content.url} alt={content.description}>
        </img>
      </div>
    </div>
  );
}

export default PreviewImageElement;
