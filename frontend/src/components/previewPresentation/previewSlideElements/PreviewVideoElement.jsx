import React, { useState, useEffect } from 'react';
import '../../../styles/slideElements.css'
import '../../../styles/preview.css'
import '../../../styles/global.css'

function PreviewVideoElement ({ key, content, width, height }) {
  const [slideSize, setSlideSize] = useState({ x: width, y: height });

  useEffect(() => {
    setSlideSize({
      x: width,
      y: height
    });
  }, [width, height]);

  const getYouTubeEmbedUrl = (url) => {
    try {
      const urlObj = new URL(url);
      const videoId = new URLSearchParams(urlObj.search).get('v');
      if (videoId) {
        const autoplay = content.autoplay ? 1 : 0;
        const mute = autoplay ? 1 : 0;
        return `https://www.youtube.com/embed/${videoId}?autoplay=${autoplay}&mute=${mute}&controls=0`;
      } else {
        throw new Error('Invalid YouTube URL or missing video ID');
      }
    } catch (error) {
      return '';
    }
  };

  const renderVideoContent = () => {
    if (!content.isFile) {
      return (
        <iframe
          className='video-preview-element'
          draggable="false"
          src={getYouTubeEmbedUrl(content.url)}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen='true'
          ></iframe>
      );
    } else {
      return (
        <video className='video-preview-element' src={content.url} controls autoPlay={content.autoplay}>
          Your browser does not support the video tag.
        </video>
      );
    }
  }

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
        className='slide-element-content pointer'
        style={{
          zIndex: content.contentNum,
        }}>
        {renderVideoContent()}
      </div>
    </div>
  );
}

export default PreviewVideoElement;
