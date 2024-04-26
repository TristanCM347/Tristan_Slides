import React from 'react';
import '../../../styles/slide.css';

function DraggableSlide ({ slide, index, slides, onRearrange, setSlides }) {
  const handleDragStart = (e) => {
    e.dataTransfer.setData('application/reactflow', index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const originIndex = parseInt(e.dataTransfer.getData('application/reactflow'));
    if (originIndex !== index) {
      const newSlides = Array.from(slides);
      const [removed] = newSlides.splice(originIndex, 1);
      newSlides.splice(index, 0, removed);
      setSlides(newSlides);
    }
  };

  return (
      <div
          draggable
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className="rearrange-slide"
          style={{ left: `${index * 100}px`, color: 'black' }}
      >
          Slide {slide.slideNum}
      </div>
  );
}

export default DraggableSlide;
