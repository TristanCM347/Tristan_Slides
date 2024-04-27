import React from 'react';
import { useParams } from 'react-router-dom';
import { getData, setData } from '../../../utility/data';

function PreviewPresentationButton ({ presentation }) {
  const { presentationId, slideNum } = useParams();

  const handlePreviewPresentation = async () => {
    const url = `http://localhost:${3000}/preview/${presentationId}/${slideNum}`;
    const data = await getData();
    let found = false;
    for (const presentationNum in data.store.previews) {
      if (data.store.previews[presentationNum].id === presentation.id) {
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
