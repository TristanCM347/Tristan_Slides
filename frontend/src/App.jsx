import React from 'react';
import LoginRegisterScreen from './components/loginRegisterScreen/LoginRegisterScreen.jsx';
import Dashboard from './components/dashboardScreen/Dashboard.jsx'
import Presentation from './components/presentationScreen/Presentation'
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import NonAuthRoute from './components/routes/NonAuthRoute.jsx';
import AuthRoute from './components/routes/AuthRoute.jsx';
import ValidPresentationRoute from './components/routes/ValidPresentationRoute.jsx';
import PreviewPresentation from './components/previewPresentation/PreviewPresentation.jsx';

function App () {
  const RedirectToFirstSlide = () => {
    const { presentationId } = useParams();
    const redirectTo = `/${presentationId}/1`;
    return <Navigate to={redirectTo} replace />;
  };

  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={
          <NonAuthRoute>
            <AuthRoute>
            </AuthRoute>
          </NonAuthRoute>
        } />
        <Route path="/login" element={
          <NonAuthRoute>
            <LoginRegisterScreen loginOrRegister={false} />
          </NonAuthRoute>
        } />
        <Route path="/register" element={
          <NonAuthRoute>
            <LoginRegisterScreen loginOrRegister={true} />
          </NonAuthRoute>
          } />
        <Route path="/dashboard" element={
          <AuthRoute>
            <Dashboard />
          </AuthRoute>
        } />
        <Route path="/:presentationId" element={
          <RedirectToFirstSlide />
        } />
        <Route path="/:presentationId/:slideNum" element={
          <AuthRoute>
            <ValidPresentationRoute>
              <Presentation />
            </ValidPresentationRoute>
          </AuthRoute>
        } />
        <Route path="/preview/:presentationId/:slideNum" element={
          <AuthRoute>
            <ValidPresentationRoute>
              <PreviewPresentation />
            </ValidPresentationRoute>
          </AuthRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
