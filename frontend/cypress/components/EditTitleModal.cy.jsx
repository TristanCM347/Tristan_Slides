import React from 'react'
import { mount } from '@cypress/react';
import EditTitleModal from '../../src/components/presentationScreen/optionsModal/EditTitleModal'

describe('<EditTitleModal />', () => {
  beforeEach(() => {
    const setPresentation = cy.stub().as('setPresentation');
    const setOptionsModalState = cy.stub().as('setOptionsModalState');
    const inputPresentation = {
      id: 'example id',
      isDeleted: false,
      transition: false,
      name: 'example',
      description: '',
      thumbnailUrl: '',
      numSlides: 1,
      slides: []
    };

    mount(<EditTitleModal
      presentation={inputPresentation}
      setPresentation={setPresentation}
      setOptionsModalState={setOptionsModalState}
    />);
  });

  it('loads with initial presentation name', () => {
    cy.get('#presentation-name').should('have.value', 'example');
  });

  it('changes title on user input', () => {
    cy.get('#presentation-name').clear().type('new title');
    cy.get('#presentation-name').should('have.value', 'new title');
  });

  it('submits new title', () => {
    cy.get('#presentation-name').clear().type('new title');
    cy.get('form').submit();
    cy.get('@setPresentation').should('have.been.calledOnce');
    cy.get('@setOptionsModalState').should('have.been.calledWith', 'none');
  });

  it('closes modal on escape key', () => {
    cy.get('body').trigger('keydown', { key: 'Escape' });
    cy.get('@setOptionsModalState').should('have.been.calledWith', 'none');
  });

  it('closes modal on exit button click', () => {
    cy.get('.close-presentation-modal-button').click();
    cy.get('@setOptionsModalState').should('have.been.calledWith', 'none');
  });
})
