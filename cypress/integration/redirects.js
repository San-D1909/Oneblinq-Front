describe('Redirect tests', () => {
    it('Test home to plugin page', () => {
        cy.visit("/")
        /* ==== Generated with Cypress Studio ==== */
        cy.get('.btn-oneblinq-roze').click();
        /* ==== End Cypress Studio ==== */
    })

    it('Plugin info page test', () => {
        cy.visit("/")

        /* ==== Generated with Cypress Studio ==== */
        cy.get('.btn-oneblinq-roze').click();
        cy.get('.card-body > img').click();
        /* ==== End Cypress Studio ==== */


    })
})
