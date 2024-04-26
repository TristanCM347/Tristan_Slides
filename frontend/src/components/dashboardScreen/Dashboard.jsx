import React, { useState } from 'react';
import DashboardHeader from './DashboardHeader';
import DashboardMain from './DashboardMain';
import '../../styles/dashboard.css';

function Dashboard () {
  const [isNewModalShown, setIsNewModalShown] = useState(false);
  const [isRestoreModalShown, setIsRestoreModalShown] = useState(false);
  const [isSettingsModalShown, setIsSettingsModalShown] = useState(false);
  const [updateModalState, setUpdateModalState] = useState({
    visibility: false,
    presentation: {}
  });

  const showNewModal = () => setIsNewModalShown(true);
  const hideNewModal = () => setIsNewModalShown(false);
  const showUpdateModal = (presentation) => {
    setUpdateModalState({
      visibility: true,
      presentation
    });
  };
  const hideUpdateModal = () => {
    setUpdateModalState({
      visibility: false,
      presentation: {}
    });
  };
  return (
    <div id="dashboard">
      <DashboardHeader isNewModalShown={isNewModalShown} updateModalState={updateModalState} showNewModal={showNewModal} isRestoreModalShown={isRestoreModalShown} setIsRestoreModalShown={setIsRestoreModalShown} isSettingsModalShown={isSettingsModalShown} setIsSettingsModalShown={setIsSettingsModalShown}/>
      <DashboardMain isNewModalShown={isNewModalShown} updateModalState={updateModalState} hideNewModal={hideNewModal} showUpdateModal={showUpdateModal} hideUpdateModal={hideUpdateModal} isRestoreModalShown={isRestoreModalShown} setIsRestoreModalShown={setIsRestoreModalShown} isSettingsModalShown={isSettingsModalShown} setIsSettingsModalShown={setIsSettingsModalShown} />
    </div>
  );
}

export default Dashboard;
