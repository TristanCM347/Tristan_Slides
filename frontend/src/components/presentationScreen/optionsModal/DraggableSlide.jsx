import React from 'react';
import '../../../styles/presentationModal.css';

function DraggableSlide ({ index, slide, slides, setSlides }) {
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
      const newSlides = [...slides];
      const [removedSlide] = newSlides.splice(originIndex, 1);
      newSlides.splice(index, 0, removedSlide);
      setSlides(newSlides);
      console.log('set slides called')
    }
  };

  return (
      <div
          draggable
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className="rearrange-slide"
      >
          Slide {slide.slideNum}
      </div>
  );
}

export default DraggableSlide;
