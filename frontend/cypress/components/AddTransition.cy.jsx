import React from 'react'
import { mount } from '@cypress/react';
import AddTransition from '../../src/components/presentationScreen/optionsModal/AddTransition'

describe('<AddTransition />', () => {
  beforeEach(() => {
    const setPresentation = cy.stub().as('setPresentation');
    const setOptionsModalState = cy.stub().as('setOptionsModalState');

    const presentation = {
      transition: false
    };
    const currentSlideNumInt = 0;

    mount(
      <AddTransition
        presentation={presentation}
        currentSlideNumInt={currentSlideNumInt}
        setPresentation={setPresentation}
        setOptionsModalState={setOptionsModalState}
      />
    );
  });

  it('toggles transition state correctly', () => {
    cy.get('.transition').should('not.be.checked');
    cy.get('.transition').click().should('be.checked');
    cy.get('.transition').click().should('not.be.checked');
  });

  it('submits the transition change', () => {
    cy.get('.transition').click();
    cy.get('button').contains('Submit').click();
    cy.get('@setPresentation').should('have.been.calledOnce');
    cy.get('@setOptionsModalState').should('have.been.calledWith', 'none');
  });

  it('exits the modal when exit button is clicked', () => {
    cy.get('button').contains('Exit').click();
    cy.get('@setOptionsModalState').should('have.been.calledWith', 'none');
  });
})
