import React from 'react';

function ThumbnailButton ({ setOptionsModalState }) {
  const handleEditThumbnail = () => {
    setOptionsModalState('edit-thumbnail')
  };

  return (
    <button onClick={handleEditThumbnail} title="Clikc here to edit your thumbnail" className="white-background-grey-text-button presentation-header-button "> Edit Thumbnail  </button>
  );
}

export default ThumbnailButton;
