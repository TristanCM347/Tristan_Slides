describe('template spec', () => {
  it('passes', () => {
    // 1. Registers successfully
    cy.visit('http://localhost:3000')
    cy.get('.non-selected-toggle').click()
    cy.get('#register-email').type('exampleEmail0201@gmail.com');
    cy.get('#register-name').type('john');
    cy.get('#register-password').type('pass word');
    cy.get('#confirm-register-password').type('pass word');
    cy.get('#submit-register-form-button').click()
  
    // 2. Creates a new presentation successfully with correct thumbnail and name
    cy.get('#create-presentation-button').click()
    cy.get('#presentation-name').type('example presentation name');
    cy.get('.presentation-description')
    .type('this is the description of our example presentation');
    cy.get('.thumbnail-input').selectFile('../frontend/public/volume_button.png');
    cy.get('.submit-presentation-modal-button').click()
    cy.get('#presentation-card-name').should('have.text', 'example presentation name');
    cy.get('#presentation-description-id').should('have.text',
    'Description: this is the description of our example presentation');
    cy.get('.presentation-card').click();
    
    // 3. add 4 slides
    cy.get('#toolbar-add-slide').click()
    cy.get('#toolbar-add-slide').click()
    cy.get('#toolbar-add-slide').click()
    cy.get('#toolbar-add-slide').click()
  

    // // 7. Add text
    const firstDescription = 'slide text description';
    cy.get('#toolbar-text-button').click()
    cy.get('.slide-textbox').clear().type(firstDescription).trigger('change');
    cy.get('.submit-adding-text').click()

    // 8. Edit text (font, fontsize, font colour)
    cy.get('.text-element-rendered').dblclick();
    cy.get('.slide-textbox').type(' 2');
    cy.get('.font').type('Helvetica');
    cy.get('#font-size').clear().type('2');
    cy.get('.submit-editing-text').click()
    cy.get('.text-element').should('have.text', 'slide text description 2');

    // 10. Delete text
    cy.get('.text-element-rendered').rightclick()
  
    // 11. Set image to accept file 
    cy.get('#toolbar-image-button').click()
    cy.get('.file').check();

    // 12. input file
    cy.get('.thumbnail-input').selectFile('../frontend/public/volume_button.png')
    cy.get('.submit-adding-image').click()
    cy.get('.image-element').should('exist');
  
    // save presentation
    cy.get('#save-presentation-button').click();
    cy.get('.presentation-modal-no').click();

    // go back
    cy.get('#presentation-header-back').click();
    cy.get('#dashboard-main').should('exist');

    // go back to presentation and check image, video and code are there
    cy.get('.presentation-card').click();
    cy.get('.image-element').should('exist');

    // preview
    cy.get('#preview-presentation-button').click();
  })
})
