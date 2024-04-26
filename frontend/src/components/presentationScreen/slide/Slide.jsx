import React, { useState, useEffect, useRef } from 'react';
import TextElement from './slideElements/TextElement'
import ImageElement from './slideElements/ImageElement';
import VideoElement from './slideElements/VideoElement';
import CodeElement from './slideElements/CodeElement';
import '../../../styles/slide.css';
import SlideNumber from './slideElements/SlideNumber';

function Slide ({ optionsModalState, currentSlideNumInt, presentation, setOptionsModalState, setPresentation }) {
  if (optionsModalState !== 'none') {
    return null;
  }
  const [slideSize, setSlideSize] = useState({ width: 200, height: 200 });
  // const [selectedElement, setSelectedElement] = useState(null)

  const getColor = () => {
    if (presentation.slides[currentSlideNumInt - 1].useCustom) {
      return presentation.slides[currentSlideNumInt - 1].background
    } else {
      return presentation.defaultBackground
    }
  }

  const color = getColor();

  const slideContainerRef = useRef(null);

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

  console.log(presentation)

  return (
    <div ref={slideContainerRef} className='slide-container dark-background-colour-theme'>
      <div className='slide'
      style={{ width: `${slideSize.width}px`, height: `${slideSize.height}px`, backgroundColor: color, border: 'none' }}>
        {presentation.slides[currentSlideNumInt - 1].content.length > 0 &&
          presentation.slides[currentSlideNumInt - 1].content.map((content, index) => {
            if (content.type === 'text') {
              return (
                <TextElement key={content.contentNum} content={content} setOptionsModalState={setOptionsModalState}
                setPresentation={setPresentation} width={slideSize.width} height={slideSize.height} currentSlideNumInt={currentSlideNumInt - 1} presentation={presentation}/>
              );
            } else if (content.type === 'image') {
              return (
                <ImageElement key={content.contentNum} content={content} setOptionsModalState={setOptionsModalState}
                setPresentation={setPresentation} width={slideSize.width} height={slideSize.height} currentSlideNumInt={currentSlideNumInt - 1} presentation={presentation}/>
              );
            } else if (content.type === 'code') {
              return (
                <CodeElement key={content.contentNum} content={content} setOptionsModalState={setOptionsModalState}
                setPresentation={setPresentation} width={slideSize.width} height={slideSize.height} currentSlideNumInt={currentSlideNumInt - 1} presentation={presentation}/>
              );
            } else if (content.type === 'video') {
              return (
                <VideoElement key={content.contentNum} content={content} setOptionsModalState={setOptionsModalState}
                setPresentation={setPresentation} width={slideSize.width} height={slideSize.height} currentSlideNumInt={currentSlideNumInt - 1} presentation={presentation}/>
              );
            } else {
              return null
            }
          })
        }
        <SlideNumber currentSlideNumInt={presentation.slides[currentSlideNumInt - 1].slideNum}/>
      </div>
    </div>
  );
}

export default Slide;
