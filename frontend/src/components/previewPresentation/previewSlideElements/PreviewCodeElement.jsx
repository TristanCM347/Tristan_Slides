import React, { useState, useEffect } from 'react';
import '../../../styles/slideElements.css'
import Editor from '@monaco-editor/react';

function PreviewCodeElement ({ key, content, width, height }) {
  const [slideSize, setSlideSize] = useState({ x: width, y: height });

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
      }}>
        <Editor
          height='100%'
          width='100%'
          zIndex='10000000'
          language={content.language}
          defaultValue={content.code}
          theme="vs-dark"
          options={{
            lineNumbers: 'on',
            fontSize: `${content.fontSize}em`,
            readOnly: true,
            minimap: { enabled: false },
            scrollBeyondLastLine: false
          }}
        />
      </div>
    </div>
  );
}

export default PreviewCodeElement;
