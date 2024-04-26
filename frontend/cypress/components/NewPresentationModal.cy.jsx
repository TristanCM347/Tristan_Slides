import React from 'react';
import { mount } from '@cypress/react';
import NewPresentationModal from '../../src/components/dashboardScreen/NewPresentationModal'
import GREY_THUMBNAIL from '../fixtures/grey.jpeg';

describe('<NewPresentationModal />', () => {
  it('prevents submission when required fields are not filled', () => {
    mount(
      <NewPresentationModal
        isNewModalShown={true}
        updateModalState={{ visibility: false }}
        hideNewModal={() => {}}
        hideUpdateModal={() => {}}
      />
    );

    cy.get('#presentation-name').clear();
    cy.get('.presentation-description').clear();
    cy.get('.submit-presentation-modal-button').click();
    cy.get('.presentation-modal').should('be.visible');
  });

  it('New Presentation Modal - Renders and can submit a new presentation', () => {
    const hideNewModal = cy.stub();
    mount(
      <NewPresentationModal
        isNewModalShown={true}
        updateModalState={{ visibility: false }}
        hideNewModal={hideNewModal}
        hideUpdateModal={() => {}}
      />
    );

    cy.get('#presentation-name').type('Test Presentation');
    cy.get('.presentation-description').type('This is a test description.');
    cy.get('.thumbnail-input').selectFile('../frontend/public/volume_button.png', { action: 'select' });
    cy.get('.submit-presentation-modal-button').click();
  });

  it('Update Presentation Modal - Renders and can update an existing presentation', () => {
    const hideUpdateModal = cy.stub();
    mount(
      <NewPresentationModal
        isNewModalShown={false}
        updateModalState={{ visibility: true, presentation: { name: 'Existing Presentation', description: 'Existing description', thumbnailUrl: GREY_THUMBNAIL } }}
        hideNewModal={() => {}}
        hideUpdateModal={hideUpdateModal}
      />
    );

    cy.get('#presentation-name').clear().type('Updated Presentation');
    cy.get('.presentation-description').clear().type('Updated description.');
    cy.get('.submit-presentation-modal-button').click();
  });

  it('allows a user to upload a file and preview the image', () => {
    const hideNewModal = cy.stub();
    mount(
      <NewPresentationModal
        isNewModalShown={true}
        updateModalState={{ visibility: false }}
        hideNewModal={hideNewModal}
        hideUpdateModal={() => {}}
      />
    );

    cy.get('.thumbnail-input').selectFile('../frontend/public/volume_button.png', { action: 'select' });
    cy.get('.preview-thumbnail-button').click();
    cy.get('.thumbnail-image-container img').should('have.attr', 'src');
  });
})
