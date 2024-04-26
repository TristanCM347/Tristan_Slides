import React from 'react';
import { useParams } from 'react-router-dom';
import { getData, setData } from '../../../utility/data';

function PreviewPresentationButton ({ presentation }) {
  const { presentationId, slideNum } = useParams();

  const handlePreviewPresentation = async () => {
    const url = `http://localhost:${3000}/preview/${presentationId}/${slideNum}`;
    const data = await getData();
    let found = false;
    console.log(presentationId, presentation, data.store)
    for (const presentationNum in data.store.previews) {
      console.log(data.store.previews[presentationNum].id, presentation.id)
      if (data.store.previews[presentationNum].id === presentation.id) {
        console.log('found our pres')
        data.store.previews[presentationNum] = presentation;
        found = true;
      }
    }
    if (!found) {
      data.store.previews.push(presentation);
    }

    await setData(data);

    window.open(url);
  };

  return (
    <button onClick={handlePreviewPresentation} id="preview-presentation-button" title="Click here to see a preview of your presentation" className="white-background-grey-text-button presentation-header-button "> Preview </button>
  );
}

export default PreviewPresentationButton;
