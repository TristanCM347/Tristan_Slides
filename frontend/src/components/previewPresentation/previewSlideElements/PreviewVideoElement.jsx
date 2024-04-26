import React, { useState, useEffect } from 'react';
import '../../../styles/slideElements.css'

function PreviewVideoElement ({ key, content, width, height }) {
  const [slideSize, setSlideSize] = useState({ x: width, y: height });

  useEffect(() => {
    setSlideSize({
      x: width,
      y: height
    });
  }, [width, height]);

  console.log(content)
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
        }}>
        <video className='video-element' src={content.url} controls autoPlay={content.autoplay}>
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}

export default PreviewVideoElement;
