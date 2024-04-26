import React from 'react'
import Slide from '../../src/components/presentationScreen/slide/Slide';
import { mount } from '@cypress/react';

describe('<Slide />', () => {
  const basePresentation = {
    slides: [
      {
        background: 'black',
        presentationBackground: 'white',
        content: [
          { type: 'text', contentNum: 1, description: 'Test Text' },
          { type: 'image', contentNum: 2, src: '../frontend/public/volume_button.png' },
          { type: 'code', contentNum: 4, codeSnippet: 'console.log("hello world");' }
        ],
        slideNum: 1
      }
    ]
  };

  it('does not render when optionsModalState is not "none"', () => {
    mount(
      <Slide
        changeSlide={null}
        optionsModalState="visible"
        currentSlideNumInt={1}
        presentation={basePresentation}
        setOptionsModalState={() => {}}
        setPresentation={() => {}}
      />
    );
    cy.get('.slide-container').should('not.exist');
  });

  it('renders correctly when optionsModalState is "none"', () => {
    mount(
      <Slide
        changeSlide={null}
        optionsModalState="none"
        currentSlideNumInt={1}
        presentation={basePresentation}
        setOptionsModalState={() => {}}
        setPresentation={() => {}}
      />
    );
    cy.get('.slide-container').should('exist');
  });

  it('only renders the appropriate child components based on content type', () => {
    const customPresentation = {
      slides: [
        {
          background: 'grey',
          presentationBackground: 'grey',
          content: [
            { type: 'text', contentNum: 1, description: 'Only Text' }
          ],
          slideNum: 1
        }
      ]
    };

    mount(
      <Slide
        changeSlide={null}
        optionsModalState="none"
        currentSlideNumInt={1}
        presentation={customPresentation}
        setOptionsModalState={() => {}}
        setPresentation={() => {}}
      />
    );

    cy.get('ImageElement').should('not.exist');
    cy.get('VideoElement').should('not.exist');
    cy.get('CodeElement').should('not.exist');
  });

  it('applies the correct transition class based on changeSlide prop', () => {
    mount(
      <Slide
        changeSlide="right"
        optionsModalState="none"
        currentSlideNumInt={1}
        presentation={basePresentation}
        setOptionsModalState={() => {}}
        setPresentation={() => {}}
      />
    );

    cy.get('.slide').should('have.class', 'slide-transition-right');
    cy.get('.slide').should('not.have.class', 'slide-transition-left');
  });
})
