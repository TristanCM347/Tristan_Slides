import React from 'react';

function TitleButton ({ setOptionsModalState }) {
  const handleEditTitle = () => {
    setOptionsModalState('edit-title')
  };

  return (
    <button onClick={handleEditTitle} title="Click here to edit your title" className="white-background-grey-text-button presentation-header-button "> Edit Title  </button>
  );
}

export default TitleButton;
