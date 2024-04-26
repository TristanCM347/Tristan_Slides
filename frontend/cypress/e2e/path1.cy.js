describe('template spec', () => {
  it('passes', () => {
    // registers successfully
    cy.visit('http://localhost:3000')
    cy.get('.non-selected-toggle').click()
    cy.get('#register-email').type('exampleEmail02111@gmail.com');
    cy.get('#register-name').type('john');
    cy.get('#register-password').type('pass word');
    cy.get('#confirm-register-password').type('pass word');
    cy.get('#submit-register-form-button').click()

    // creates new presentation
    cy.get('#create-presentation-button').click()
    cy.get('#presentation-name').type('example presentation name');
    cy.get('.presentation-description')
    .type('this is the description of our example presentation');
    cy.get('.submit-presentation-modal-button').click()
    cy.get('#presentation-card-name').should('have.text', 'example presentation name');
    cy.get('#presentation-description-id').should('have.text',
    'Description: this is the description of our example presentation');

    // updates thumbnail and name of presentation
    cy.get('#presentation-card-settings-icon').click();
    cy.get('#presentation-name').type(' 2');
    cy.get('.thumbnail-input').selectFile('../frontend/public/volume_button.png');
    cy.get('#submit-presentation-button-id').click()
    cy.get('#presentation-card-name').should('have.text',
    'example presentation name 2');

    // delete presentation
    cy.get(".presentation-card").click()
    cy.get("#delete-presentation-button").click()
    cy.get("#submit-delete-presentation-id").click()
    cy.get('.presentation-card').should('not.exist')

    // add 3 slides to presentation
    cy.get('#create-presentation-button').click()
    cy.get('#presentation-name').type('example presentation name');
    cy.get('.submit-presentation-modal-button').click()
    cy.get(".presentation-card").click()
    cy.get('#toolbar-add-slide').click()
    cy.get('#toolbar-add-slide').click()
    cy.get('#toolbar-add-slide').click()

    // switch between slides
    cy.get('.slide-number-container').should('have.text', '1');
    cy.get('#right-slide').click();
    cy.get('.slide-number-container').should('have.text', '2');
    cy.get('#right-slide').click();
    cy.get('.slide-number-container').should('have.text', '3');
    cy.get('#right-slide').click();
    cy.get('.slide-number-container').should('have.text', '4');
    cy.get('#left-slide').click();
    cy.get('.slide-number-container').should('have.text', '3');
    cy.get('#left-slide').click();
    cy.get('.slide-number-container').should('have.text', '2');
    cy.get('#left-slide').click();
    cy.get('.slide-number-container').should('have.text', '1');

    // logs out
    cy.get('#logout-button-id').click()

    // logs back in
    cy.get('#login-email').type('exampleEmail02111@gmail.com')
    cy.get('#login-password').type('pass word')
    cy.get('#submit-login-form-button').click()
  })
})

// - First Path
// 1. Registers successfully
// 2. Creates a new presentation successfully
// 3. Updates the thumbnail and name of the presentation successfully
// 4. Delete a presentation successfully
// 5. Add some slides in a slideshow deck successfully
// 6. Switch between slides successfully
// 7. Logs out of the application successfully
// 8. Logs back into the application successfully
