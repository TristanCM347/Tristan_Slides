import React from 'react';
import '../../styles/header.css';
import '../../styles/global.css';
import LogoutButton from '../presentationScreen/presentationHeader/LogoutButton';
import NewPresentationButton from './NewPresentationButton';
import SettingsButton from './SettingsButton';
import RestorePresentationsButton from './RestorePresentationsButton';

function DashboardHeader ({ isNewModalShown, updateModalState, showNewModal, isRestoreModalShown, setIsRestoreModalShown, isSettingsModalShown, setIsSettingsModalShown }) {
  return (
    <div id="header" className="dark-background-colour-theme">
      <LogoutButton/>
      {!isRestoreModalShown && !isSettingsModalShown && <SettingsButton isNewModalShown={isNewModalShown} updateModalState={updateModalState} setIsSettingsModalShown={setIsSettingsModalShown} />}
      {!isRestoreModalShown && !isSettingsModalShown && <RestorePresentationsButton isNewModalShown={isNewModalShown} updateModalState={updateModalState} setIsRestoreModalShown={setIsRestoreModalShown} />}
      {!isRestoreModalShown && !isSettingsModalShown && <NewPresentationButton isNewModalShown={isNewModalShown} updateModalState={updateModalState} showNewModal={showNewModal}/>}
    </div>
  );
}

export default DashboardHeader;
