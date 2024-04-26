import React from 'react';
import '../../styles/dashboard.css';
import '../../styles/global.css';
import NewPresentationModal from './NewPresentationModal';
import PresentationList from './PresentationList';
import SettingsModal from './SettingsModal';
import RestorePresenationsModal from './RestorePresenationsModal';

function DashboardMain ({ isNewModalShown, updateModalState, hideNewModal, showUpdateModal, hideUpdateModal, isRestoreModalShown, setIsRestoreModalShown, isSettingsModalShown, setIsSettingsModalShown }) {
  return (
    <div id="dashboard-main" className="fancy-background-colour-theme">
      {!isRestoreModalShown && !isSettingsModalShown && <PresentationList isNewModalShown={isNewModalShown} updateModalState={updateModalState} showUpdateModal={showUpdateModal} />}
      {!isRestoreModalShown && !isSettingsModalShown && <NewPresentationModal isNewModalShown={isNewModalShown} updateModalState={updateModalState} hideNewModal={hideNewModal} hideUpdateModal={hideUpdateModal}/>}

      {!isRestoreModalShown && isSettingsModalShown && <SettingsModal isNewModalShown={isNewModalShown} updateModalState={updateModalState} setIsSettingsModalShown={setIsSettingsModalShown}/>}
      {isRestoreModalShown && !isSettingsModalShown && <RestorePresenationsModal isNewModalShown={isNewModalShown} updateModalState={updateModalState} setIsRestoreModalShown={setIsRestoreModalShown}/>}
    </div>
  );
}

export default DashboardMain;
