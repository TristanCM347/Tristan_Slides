import React from 'react';
import LogoutButton from './LogoutButton';
import BackPresentationButton from './BackPresentationButton';
import DeletePresentationButton from './DeletePresentationButton';
import SavePresentationButton from './SavePresentationButton';
import RearrangeSlidesButton from './RearrangeSlidesButton';
import TitleButton from './TitleButton';
import PreviewPresentationButton from './PreviewPresentationButton';
import RevisionHistoryButton from './RevisionHistoryButton';

import '../../../styles/presentation.css';
import '../../../styles/header.css';
import ThumbnailButton from './ThumbnailButton';

function PresentationHeader ({ setOptionsModalState, presentation, setPresentation }) {
  return (
    <div id="header" className="dark-background-colour-theme">
      <LogoutButton/>
      <BackPresentationButton/>
      <DeletePresentationButton setOptionsModalState={setOptionsModalState}/>
      <SavePresentationButton setOptionsModalState={setOptionsModalState} presentation={presentation} setPresentation={setPresentation}/>
      <PreviewPresentationButton presentation={presentation}/>
      <RearrangeSlidesButton setOptionsModalState={setOptionsModalState}/>
      <TitleButton setOptionsModalState={setOptionsModalState}/>
      <ThumbnailButton setOptionsModalState={setOptionsModalState}/>
      <RevisionHistoryButton setOptionsModalState={setOptionsModalState}/>
    </div>
  );
}

export default PresentationHeader;
