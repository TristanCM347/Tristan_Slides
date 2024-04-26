import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getData, setData, addNewHistory } from '../../utility/data';
import '../../styles/presentation.css';
import '../../styles/slide.css';
import PresentationHeader from './presentationHeader/PresentationHeader';
import ToolbarList from './toolbarList/ToolbarList';
import Slide from './slide/Slide';
import SlideNavigation from './slideNavigation/SlideNavigation';
import PresentationOptionsModal from './optionsModal/PresentationOptionsModal';
import PresentationTitle from './title/PresentationTitle';

function Presentation () {
  const { presentationId, slideNum } = useParams();
  const navigate = useNavigate();
  const [autoSave, setAutoSave] = useState(false);
  const slideNumInt = Number(slideNum);
  const [optionsModalState, setOptionsModalState] = useState('none');
  const [presentation, setPresentation] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSlideNumInt, setCurrentSlideNumInt] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData();
        setAutoSave(data.store.autoSave);
        for (const eachPresentation of data.store.presentations) {
          if (eachPresentation.id === presentationId) {
            setPresentation(eachPresentation);
            setIsLoaded(true);
          }
        }
      } catch (error) {
        console.error('Error getting presentation:', error);
      }
    };

    fetchData();
  }, [presentationId]);

  useEffect(() => {
    if (isLoaded) {
      if (slideNumInt !== currentSlideNumInt) {
        if (slideNumInt < 1 || slideNumInt > presentation.slides.length) {
          navigate(`/${presentationId}/1`);
        } else {
          setCurrentSlideNumInt(slideNumInt);
        }
      }
    }
  }, [slideNumInt, isLoaded]);

  useEffect(() => {
    const saveCurrentState = async () => {
      const data = await getData();
      for (const presentationNum in data.store.presentations) {
        if (data.store.presentations[presentationNum].id === presentation.id) {
          data.store.presentations[presentationNum] = presentation;
          await setData(data);
        }
      }
    }
    if (autoSave && isLoaded) {
      saveCurrentState();
    }
  }, [presentation, isLoaded]);

  useEffect(() => {
    const saveCurrentPresentationIntoVersionHistory = () => {
      addNewHistory(presentation);
    }

    const interval = setInterval(() => {
      if (presentation) {
        saveCurrentPresentationIntoVersionHistory();
      }
    }, 90000);

    return () => clearInterval(interval);
  }, [presentation]);

  if (!presentation) {
    return <div>Loading presentation...</div>;
  }

  return (
    <div id="presentation">
      <PresentationHeader setOptionsModalState={setOptionsModalState} presentation={presentation} setPresentation={setPresentation} currentSlideNumInt={currentSlideNumInt} />
      <div id="presentation-main" className="fancy-background-colour-theme">
        <PresentationTitle presentation={presentation} optionsModalState={optionsModalState} />
        <div id="presentation-centre">
          <Slide optionsModalState={optionsModalState} currentSlideNumInt={currentSlideNumInt} presentation={presentation} setOptionsModalState={setOptionsModalState} setPresentation={setPresentation}/>
        </div>
        <ToolbarList optionsModalState={optionsModalState} setOptionsModalState={setOptionsModalState} presentation={presentation} setPresentation={setPresentation}/>
        <SlideNavigation optionsModalState={optionsModalState} currentSlideNumInt={currentSlideNumInt} presentation={presentation} />
        <PresentationOptionsModal optionsModalState={optionsModalState} setOptionsModalState={setOptionsModalState} presentation={presentation} setPresentation={setPresentation}
        setCurrentSlideNumInt={setCurrentSlideNumInt} currentSlideNumInt={currentSlideNumInt} />
      </div>
    </div>
  );
}

export default Presentation;
