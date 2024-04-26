import React from 'react';

function RevisionHistoryButton ({ setOptionsModalState }) {
  const handleRevisionHistory = () => {
    setOptionsModalState('revision-history')
  };

  return (
    <button onClick={handleRevisionHistory} title="Click here to check and restore revision history" className="white-background-grey-text-button presentation-header-button "> Revision History  </button>
  );
}

export default RevisionHistoryButton;
