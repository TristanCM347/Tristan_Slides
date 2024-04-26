import React, { useState } from 'react';
import DeletePresentationModal from './DeletePresentationModal';
import SavePresentationModal from './SavePresentationModal';
import EditTitleModal from './EditTitleModal';
import AddTextModal from './AddTextModal';
import EditThumbnailModal from './EditThumbnailModal';
import DeleteSlideConfirmModal from './DeleteSlideConfirmModal';
import DeleteSlideErrorModal from './DeleteSlideErrorModal';
import RevisionHistoryModal from './RevisionHistoryModal';
import ConfirmRevisionHistoryModal from './ConfirmRevisionHistoryModal';
import AddCodeModal from './AddCodeModal';
import AddImageModal from './AddImageModal';
import AddVideoModal from './AddVideoModal';
import AddBackgroundModal from './AddBackgroundModal';
import RearrangeSlidesModal from './RearrangeSlidesModal';
import AddTransitionModal from './AddTransitionModal';
import '../../../styles/presentationModal.css';

function PresentationOptionsModal ({ optionsModalState, setOptionsModalState, presentation, setPresentation, setCurrentSlideNumInt, currentSlideNumInt }) {
  if (optionsModalState === 'none') {
    return null;
  }

  const [version, setVersion] = useState('current');

  return (
    <div id='presentation-screen-modal'>
      {optionsModalState === 'slide-rearrange' && <RearrangeSlidesModal presentation={presentation} currentSlideNumInt={currentSlideNumInt - 1} setPresentation={setPresentation} setOptionsModalState={setOptionsModalState}/>}
      {optionsModalState === 'slide-transition' && <AddTransitionModal presentation={presentation} currentSlideNumInt={currentSlideNumInt - 1} setPresentation={setPresentation} setOptionsModalState={setOptionsModalState}/>}
      {optionsModalState === 'slide-background' && <AddBackgroundModal presentation={presentation} currentSlideNumInt={currentSlideNumInt - 1} setPresentation={setPresentation} setOptionsModalState={setOptionsModalState}/>}
      {optionsModalState === 'slide-add-image' && <AddImageModal presentation={presentation} currentSlideNumInt={currentSlideNumInt - 1} setPresentation={setPresentation} setOptionsModalState={setOptionsModalState} isEditing={false}/>}
      {optionsModalState === 'slide-edit-image' && <AddImageModal presentation={presentation} currentSlideNumInt={currentSlideNumInt - 1} setPresentation={setPresentation} setOptionsModalState={setOptionsModalState} isEditing={true}/>}
      {optionsModalState === 'slide-add-code' && <AddCodeModal presentation={presentation} currentSlideNumInt={currentSlideNumInt - 1} setPresentation={setPresentation} setOptionsModalState={setOptionsModalState} isEditing={false}/>}
      {optionsModalState === 'slide-edit-code' && <AddCodeModal presentation={presentation} currentSlideNumInt={currentSlideNumInt - 1} setPresentation={setPresentation} setOptionsModalState={setOptionsModalState} isEditing={true}/>}
      {optionsModalState === 'slide-add-video' && <AddVideoModal presentation={presentation} currentSlideNumInt={currentSlideNumInt - 1} setPresentation={setPresentation} setOptionsModalState={setOptionsModalState} isEditing={false}/>}
      {optionsModalState === 'slide-edit-video' && <AddVideoModal presentation={presentation} currentSlideNumInt={currentSlideNumInt - 1} setPresentation={setPresentation} setOptionsModalState={setOptionsModalState} isEditing={true}/>}
      {optionsModalState === 'slide-add-text' && <AddTextModal presentation={presentation} currentSlideNumInt={currentSlideNumInt - 1} setPresentation={setPresentation} setOptionsModalState={setOptionsModalState} isEditing={false}/>}
      {optionsModalState === 'slide-edit-text' && <AddTextModal presentation={presentation} currentSlideNumInt={currentSlideNumInt - 1} setPresentation={setPresentation} setOptionsModalState={setOptionsModalState} isEditing={true}/>}
      {optionsModalState === 'delete-presentation' && <DeletePresentationModal setOptionsModalState={setOptionsModalState} presentation={presentation}/>}
      {optionsModalState === 'edit-title' && <EditTitleModal setOptionsModalState={setOptionsModalState} presentation={presentation} setPresentation={setPresentation}/>}
      {optionsModalState === 'edit-thumbnail' && <EditThumbnailModal setOptionsModalState={setOptionsModalState} presentation={presentation} setPresentation={setPresentation}/>}
      {optionsModalState === 'revision-history' && <RevisionHistoryModal setOptionsModalState={setOptionsModalState} presentation={presentation} setVersion={setVersion} />}
      {optionsModalState === 'confirm-revision-history' && <ConfirmRevisionHistoryModal setOptionsModalState={setOptionsModalState} presentation={presentation} version={version} />}
      {optionsModalState === 'save-presentation' && <SavePresentationModal setOptionsModalState={setOptionsModalState}/>}
      {optionsModalState === 'delete-slide-error' && <DeleteSlideErrorModal setOptionsModalState={setOptionsModalState}/>}
      {optionsModalState === 'delete-slide-confirm' && <DeleteSlideConfirmModal setCurrentSlideNumInt={setCurrentSlideNumInt} setOptionsModalState={setOptionsModalState} presentation={presentation} setPresentation={setPresentation} currentSlideNumInt={currentSlideNumInt}/>}
    </div>
  );
}

export default PresentationOptionsModal;
