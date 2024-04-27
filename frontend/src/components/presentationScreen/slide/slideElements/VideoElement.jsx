import React, { useState, useEffect } from 'react';
import '../../../../styles/slideElements.css'
import { Rnd } from 'react-rnd';

function VideoElement ({ content, setOptionsModalState, setPresentation, width, height, currentSlideNumInt, presentation }) {
  const [clickCount, setClickCount] = useState(0);
  const [singleClicked, setSingleClicked] = useState(false);
  const [slideSize, setSlideSize] = useState({ x: width, y: height });
  const [activeEvent, setActiveEvent] = useState(null);

  const handleResizeStart = (e) => {
    e.stopPropagation();
    if (!activeEvent) { // Ensure no active drag event
      setActiveEvent('resizing');
    }
  };

  const handleDragStart = (e) => {
    e.stopPropagation();
    if (!activeEvent) { // Ensure no active resize event
      setActiveEvent('dragging');
    }
  };

  useEffect(() => {
    setSlideSize({
      x: width,
      y: height
    });
  }, [width, height]);
  let timeout;

  const handleEditVideo = () => {
    setClickCount(prevCount => prevCount + 1);
    if (clickCount === 0) {
      timeout = setTimeout(() => {
        setPresentation(prevPresentation => {
          const newContent = presentation.slides[currentSlideNumInt].content.map(contentItem => {
            if (contentItem.contentNum === content.contentNum) {
              return {
                ...contentItem,
                isEdit: true
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

        setOptionsModalState('slide-edit-video');
        setClickCount(0);
      }, 500);
    } else if (clickCount === 1) {
      clearTimeout(timeout);
      setClickCount(0);
    }
  };

  const onResizeStop = (e, direction, ref, delta, position) => {
    if (activeEvent === 'resizing') {
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
      setActiveEvent(null);
    }
  };

  const onDragStop = (e, d) => {
    if (activeEvent === 'dragging') {
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
      setActiveEvent(null);
    }
  };

  const showCornerStyling = () => {
    setSingleClicked(true);
    setTimeout(() => {
      setSingleClicked(false);
    }, 5000);
  }

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
  const isYouTubeUrl = (url) => {
    return url.match(/(?:youtu|youtube)(?:\.com|\.be)\/([\w\-_]*)/i);
  };

  const getYouTubeEmbedUrl = (url) => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w\-_]+)/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : url;
  };

  const renderVideoContent = () => {
    if (isYouTubeUrl(content.url)) {
      return (
        <iframe
          className="video-element"
          draggable="false"
          onDragStart={(e) => e.preventDefault()}
          src={getYouTubeEmbedUrl(content.url)}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded YouTube Video"
        ></iframe>
      );
    } else {
      return (
        <video className='video-element' src={content.url} controls autoPlay={content.autoplay}>
          Your browser does not support the video tag.
        </video>
      );
    }
  };

  return (
    <Rnd
        bounds={'parent'}
        position={{ x: `${content.positionLeft * slideSize.x}`, y: `${content.positionTop * slideSize.y}` }}
        className='slide-element-container'
        onResizeStart={handleResizeStart}
        onResizeStop={onResizeStop}
        onDragStart={handleDragStart}
        onDragStop={onDragStop}
        onContextMenu={handleDeleteElemenet}
        style={{
          maxWidth: (slideSize.x - (content.positionLeft * slideSize.x)),
          maxHeight: (slideSize.y - (content.positionTop * slideSize.y)),
          minWidth: (slideSize.x * 0.01),
          minHeight: (slideSize.y * 0.01)
        }}
        size={{ width: `${content.width * slideSize.x}`, height: `${content.height * slideSize.y}` }}
        enableResizing={{
          bottomRight: true,
          bottomLeft: true,
          topLeft: true,
          topRight: true,
        }}
    >
      <div onDoubleClick={handleEditVideo} onClick={showCornerStyling}
      className='slide-element-content'
      style={{
        zIndex: content.contentNum,
      }}>
        {singleClicked && <div className="corner-top-left"></div>}
        {singleClicked && <div className="corner-top-right"></div>}
        {singleClicked && <div className="corner-bottom-left"></div>}
        {singleClicked && <div className="corner-bottom-right"></div>}
        {renderVideoContent()}
      </div>
    </Rnd>
  );
}

export default VideoElement;
