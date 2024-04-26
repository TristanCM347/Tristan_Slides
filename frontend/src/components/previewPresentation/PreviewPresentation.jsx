import React, { useState, useEffect } from 'react';
import { getData } from '../../utility/data';
import { useParams, useNavigate } from 'react-router-dom';
import '../../styles/preview.css';
import PreviewNavigation from './previewSlideNavigation/PreviewNavigation';
import PreviewSlide from './PreviewSlide';

function PreviewPresentation () {
  const { presentationId, slideNum } = useParams();
  const navigate = useNavigate();
  const slideNumInt = Number(slideNum);
  const [presentation, setPresentation] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSlideNumInt, setCurrentSlideNumInt] = useState(1);
  const [changeSlide, setChangeSlide] = useState('none');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData();
        for (const eachPresentation of data.store.previews) {
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
          navigate(`/preview/${presentationId}/1`);
        } else {
          setCurrentSlideNumInt(slideNumInt);
        }
      }
    }
  }, [slideNumInt, isLoaded]);

  if (!presentation) {
    return <div>Loading presentation...</div>;
  }

  return (
    <div id="preview" className='fancy-background-colour-theme'>
      <PreviewNavigation setChangeSlide={setChangeSlide} currentSlideNumInt={currentSlideNumInt} presentation={presentation}/>
      <PreviewSlide changeSlide={changeSlide} currentSlideNumInt={currentSlideNumInt} presentation={presentation}/>
    </div>
  );
}

export default PreviewPresentation;
