describe('Auth Tests', () => {
    it('Tests if login and logout works', () => {
        cy.visit("/login")
        /* ==== End Cypress Studio ==== */
        /* ==== Generated with Cypress Studio ==== */
        cy.get(':nth-child(1) > .form-control').clear();
        cy.get(':nth-child(1) > .form-control').type('t@t');
        cy.get(':nth-child(2) > .form-control').clear();
        cy.get(':nth-child(2) > .form-control').type('t');
        cy.get('.my-2').click();
        cy.visit('/')
        /* ==== End Cypress Studio ==== */
        /* ==== Generated with Cypress Studio ==== */
        cy.get('#accountdropdown').click();
        cy.get('[href="/logout"]').click();
        /* ==== End Cypress Studio ==== */
    })
})
