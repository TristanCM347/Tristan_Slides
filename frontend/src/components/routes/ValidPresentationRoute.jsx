import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getData } from '../../utility/data';

const ValidPresentationRoute = ({ children }) => {
  const { presentationId, slideNum } = useParams();
  const navigate = useNavigate();
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const validatePresentation = async () => {
      const data = await getData();
      let found = false;

      for (const presentation of data.store.presentations) {
        if (presentationId === presentation.id && presentation.isDeleted === false) {
          found = true;
          const slideNumInt = Number(slideNum);
          if (Number.isInteger(slideNumInt)) {
            setIsValid(true);
          } else {
            navigate('/dashboard', { replace: true });
          }
          break;
        }
      }

      if (!found) navigate('/dashboard', { replace: true });
    };

    validatePresentation();
  }, [presentationId]);

  if (!isValid) {
    return <div>Validating Route...</div>;
  }

  if (isValid) {
    return children;
  }
};

export default ValidPresentationRoute;
