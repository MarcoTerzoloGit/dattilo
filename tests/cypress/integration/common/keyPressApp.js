import { Given, And, Then, When } from "cypress-cucumber-preprocessor/steps";

Given('I access to app', function () {
    cy.intercept({
        "url": "https://type.fit/api/quotes",
        "method": "GET"
    }).as('quote')
    cy.visit('/')
    cy.wait('@quote')
    // .then(xhr=>{
    //     cy.log(xhr)
    //     var resp = JSON.parse(JSON.stringify(xhr.body))
    //     cy.log(resp)
    // })
})

When('I see a text', function () {
    cy.get('body home-page')
        .shadow()
        .find('game-view')
        .shadow()
        .find('div[class="content-container"] > wc-text-highlightable')
        .shadow()
        .find('[data-qa="quote-text"]')
        .should('exist')
        .should('be.visible').as('text')

    cy.get('@text').invoke('text').then(text=>{
        cy.log(text)
        this.map.set('text', text.trim())
        
    })
})

Then('I write the text', function(){
    cy.log(this.map)
    const text = this.map.get('text')
    cy.get('body home-page')
        .shadow()
        .find('game-view')
        .shadow()
        .find('div[class="content-container"]')
        .find('[data-qa="input-quote-text"]').as('writeText')
        .type(text, {force: true})
})

Then('I see a navbar', function(){
    cy.get('body home-page')
        .shadow()
        .find('wc-navbar')
        .shadow()
        .find('div[class="navbar"]')
        .should('be.visible').as('navbar')

    cy.get('@navbar').find('[data-qa="ladder"]').should('be.visible')
    cy.get('@navbar').find('[data-qa="home"]').should('be.visible')
    cy.get('@navbar').find('[data-qa="training"]').should('be.visible')
    cy.get('@navbar').find('[data-qa="donate"]').should('be.visible')
})

And('the system highlights the text writed', function(){
    cy.get('@writeText').invoke('text').then(writeText=>{
        cy.get('body home-page')
        .shadow()
        .find('game-view')
        .shadow()
        .find('div[class="content-container"]')
        .find('wc-text-highlightable')
        .shadow()
        .find('[data-qa="quote-text"')
        .find('[data-qa="quote-highLighted-text"]').invoke('text').then(highLightedText=>{
            expect(highLightedText.trim()).to.be.equal(writeText.trim())
        })
    })
})





