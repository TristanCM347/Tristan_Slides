import React from 'react'
import { mount } from '@cypress/react';
import RegisterToggle from '../../src/components/loginRegisterScreen/RegisterToggle'

describe('<RegisterToggle />', () => {
  beforeEach(() => {
    const toggleState = cy.stub().as('toggleState');
    const hidePopUp = cy.stub().as('hidePopup');

    mount(
      <RegisterToggle
        toggleState={toggleState}
        hidePopUp={hidePopUp}
      />
    );
  });

  it('renders the correct text in the toggle button and span', () => {
    cy.get('.non-selected-toggle').should('contain', 'Login here');
    cy.get('.selected-toggle').should('contain', 'Register');
  });

  it('calls toggleState and hidePopUp on multiple button clicks', () => {
    cy.get('.non-selected-toggle').click();
    cy.get('.non-selected-toggle').click();
    cy.get('.non-selected-toggle').click();

    cy.get('@toggleState').should('have.been.calledThrice');
    cy.get('@hidePopup').should('have.been.calledThrice');
  });

  it('does not trigger any function when other areas are clicked', () => {
    cy.get('.selected-toggle').click();
    cy.get('@toggleState').should('not.have.been.called');
    cy.get('@hidePopup').should('not.have.been.called');
  });

  it('calls toggleState and hidePopUp on button click', () => {
    cy.get('.non-selected-toggle').click();

    cy.get('@toggleState').should('have.been.calledOnce');
    cy.get('@hidePopup').should('have.been.calledOnce');
  });
})
