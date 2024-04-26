import React, { useState, useEffect, useRef } from 'react';
import '../../styles/preview.css';
import SlideNumber from '../presentationScreen/slide/slideElements/SlideNumber';
import PreviewCodeElement from './previewSlideElements/PreviewCodeElement';
import PreviewImageElement from './previewSlideElements/PreviewImageElement';
import PreviewTextElement from './previewSlideElements/PreviewTextElement';
import PreviewVideoElement from './previewSlideElements/PreviewVideoElement';

function PreviewSlide ({ changeSlide, currentSlideNumInt, presentation }) {
  const [slideSize, setSlideSize] = useState({ width: 200, height: 200 });
  const slideContainerRef = useRef(null);

  const getColor = () => {
    if (presentation.slides[currentSlideNumInt - 1].useCustom) {
      return presentation.slides[currentSlideNumInt - 1].background
    } else {
      return presentation.defaultBackground
    }
  }

  const color = getColor();

  useEffect(() => {
    function updateSlideSize () {
      const container = slideContainerRef.current;
      if (container) {
        const padding = 20;
        const containerWidth = container.offsetWidth - 2 * padding;
        const containerHeight = container.offsetHeight - 2 * padding;
        const size = Math.min(containerWidth, containerHeight);
        setSlideSize({ width: size, height: size });
      }
    }

    window.addEventListener('resize', updateSlideSize);
    updateSlideSize();

    return () => {
      window.removeEventListener('resize', updateSlideSize);
    };
  }, []);

  return (
    <div ref={slideContainerRef} id='preview-slide-container' className='dark-background-colour-theme'>
      <div id='preview-slide' className={`${changeSlide === 'right' ? 'slide-transition-right' : ''} ${changeSlide === 'left' ? 'slide-transition-left' : ''}`}
      style={{ width: `${slideSize.width}px`, height: `${slideSize.height}px`, backgroundColor: color }
    }>
      {presentation.slides[currentSlideNumInt - 1].content.length > 0 &&
          presentation.slides[currentSlideNumInt - 1].content.map((content, index) => {
            if (content.type === 'text') {
              return (
                <PreviewTextElement key={content.contentNum} content={content} width={slideSize.width} height={slideSize.height}/>
              );
            } else if (content.type === 'image') {
              return (
                <PreviewImageElement key={content.contentNum} content={content} width={slideSize.width} height={slideSize.height}/>
              );
            } else if (content.type === 'code') {
              return (
                <PreviewCodeElement key={content.contentNum} content={content} width={slideSize.width} height={slideSize.height}/>
              );
            } else if (content.type === 'video') {
              return (
                <PreviewVideoElement key={content.contentNum} content={content} width={slideSize.width} height={slideSize.height}/>
              );
            } else {
              return null
            }
          })
        }
        <SlideNumber currentSlideNumInt={currentSlideNumInt}/>
      </div>
    </div>
  );
}

export default PreviewSlide;
