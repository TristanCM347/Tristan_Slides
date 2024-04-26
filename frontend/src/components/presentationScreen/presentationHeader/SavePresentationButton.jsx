import React from 'react';
import { getData, setData } from '../../../utility/data';

function SavePresentationButton ({ setOptionsModalState, presentation }) {
  const handleSavePresentation = async () => {
    setOptionsModalState('save-presentation');
    const data = await getData();
    console.log(presentation, data)
    for (const presentationNum in data.store.presentations) {
      if (data.store.presentations[presentationNum].id === presentation.id) {
        data.store.presentations[presentationNum] = presentation;
        await setData(data);
      }
    }
  };

  return (
    <button onClick={handleSavePresentation} title="Click here to save your presentation" id="save-presentation-button" className="white-background-grey-text-button presentation-header-button "> Save </button>
  );
}

export default SavePresentationButton;
