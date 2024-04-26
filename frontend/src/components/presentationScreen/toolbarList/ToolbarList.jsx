import React from 'react';
import AddSlide from './AddSlide';
import DeleteSlide from './DeleteSlide';
import TextButton from './TextButton';
import ImageButton from './ImageButton';
import VideoButton from './VideoButton';
import CodeButton from './CodeButton';
import BackgroundButton from './BackgroundButton';
import TransitionButton from './TransitionButton';

function ToolbarList ({ optionsModalState, setOptionsModalState, presentation, setPresentation }) {
  if (optionsModalState !== 'none') {
    return null;
  }

  return (
    <div id="toolbar-list" className="dark-background-colour-theme">
      <AddSlide presentation={presentation} setPresentation={setPresentation} setOptionsModalState={setOptionsModalState}/>
      <DeleteSlide setOptionsModalState={setOptionsModalState} />
      <TextButton setOptionsModalState={setOptionsModalState}/>
      <ImageButton setOptionsModalState={setOptionsModalState}/>
      <VideoButton setOptionsModalState={setOptionsModalState}/>
      <CodeButton setOptionsModalState={setOptionsModalState}/>
      <BackgroundButton setOptionsModalState={setOptionsModalState}/>
      <TransitionButton setOptionsModalState={setOptionsModalState}/>
    </div>
  );
}

export default ToolbarList;
