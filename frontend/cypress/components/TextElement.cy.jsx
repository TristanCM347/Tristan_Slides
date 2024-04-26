import React from 'react'
import { mount } from '@cypress/react';
import TextElement from '../../src/components/presentationScreen/slide/slideElements/TextElement'

describe('<TextElement />', () => {
  beforeEach(() => {
    const setPresentation = cy.stub().as('setPresentation');
    const setOptionsModalState = cy.stub().as('setOptionsModalState');

    const content = {
      contentNum: 1,
      description: 'Sample text',
      width: 0.5,
      height: 0.5,
      positionLeft: 0.1,
      positionTop: 0.1,
      fontSize: 1,
      font: 'Arial',
      colour: 'black',
      zIndex: 1
    };
    const width = 800;
    const height = 600;
    const currentSlideNumInt = 0;

    mount(
      <TextElement
        key={1}
        content={content}
        setPresentation={setPresentation}
        setOptionsModalState={setOptionsModalState}
        width={width}
        height={height}
        currentSlideNumInt={currentSlideNumInt}
        presentation={{ slides: [{ content: [content] }] }}
      />
    );
  });

  it('handles drag correctly', () => {
    cy.get('.slide-element-container').trigger('mousedown', { which: 1 })
      .trigger('mousemove', { clientX: 100, clientY: 100 })
      .trigger('mouseup');

    cy.get('@setPresentation').should('have.been.calledOnce');
  });

  it('handles resize correctly', () => {
    cy.get('.slide-element-container').first().trigger('mousedown', { which: 1 })
      .trigger('mousemove', { clientX: 50, clientY: 50 })
      .trigger('mouseup');

    cy.get('@setPresentation').should('have.been.calledOnce');
  });

  it('enables edit mode on double click', () => {
    cy.get('.text-element-rendered').dblclick();

    cy.get('@setOptionsModalState').should('have.been.calledWith', 'slide-edit-text');
  });

  it('shows corner styling on single click', () => {
    cy.get('.text-element-rendered').click();

    cy.get('.corner-top-left').should('be.visible');
  });

  it('handles right-click for deletion correctly', () => {
    cy.get('.text-element-rendered').rightclick();

    cy.get('@setPresentation').should('have.been.calledOnce');
  });
})
