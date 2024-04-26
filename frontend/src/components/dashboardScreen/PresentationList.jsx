import React, { useEffect, useState } from 'react';
import { authAPICall } from '../../utility/apiCalls';
import PresentationCard from './PresentationCard';

function PresentationList ({ isNewModalShown, updateModalState, showUpdateModal }) {
  const [presentations, setPresentations] = useState([]);

  useEffect(() => {
    if (isNewModalShown || updateModalState.visibility) {
      return;
    }

    const fetchPresentations = async () => {
      try {
        const data = await authAPICall('store', 'GET', localStorage.getItem('token'));
        if (data.data && data.data.error) {
          console.error('Error in response data:', data.data.error);
          return;
        }

        const hasPresentations = data.store.presentations && data.store.presentations.length > 0;
        if (!hasPresentations) {
          return;
        }

        setPresentations(data.store.presentations);
      } catch (error) {
        console.error('Error making API call:', error);
      }
    };

    fetchPresentations();
  }, [isNewModalShown, updateModalState]);

  if (isNewModalShown || updateModalState.visibility) {
    return null;
  }

  return (
    <>
      {presentations.filter(p => !p.isDeleted).length > 0
        ? presentations
          .filter(presentation => !presentation.isDeleted)
          .map((presentation, index, filteredPresentations) => (
            <PresentationCard
              className='individual-presentation-card'
              key={presentation.id.toString()}
              presentation={filteredPresentations[filteredPresentations.length - 1 - index]}
              showUpdateModal={showUpdateModal}
            />
          ))
        : <>
            <div className="no-presentations-statement-wrapper">
              <h6 className="no-presentations-statement">You have no presentations right now.</h6>
            </div>
            <div className="no-presentations-statement-wrapper">
              <h6 className="no-presentations-statement">Try creating one!</h6>
            </div>
          </>
      }
    </>
  );
}

export default PresentationList;
