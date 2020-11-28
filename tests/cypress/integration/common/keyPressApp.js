import { Given, And, Then, When } from "cypress-cucumber-preprocessor/steps";

Given('I access to app', function () {
    cy.intercept({
        "url": "https://type.fit/api/quotes",
        "method": "GET"
    }).as('quote')
    cy.visit('/')
    cy.wait('@quote').then(xhr => {
        cy.log(xhr)
        var resp = JSON.parse(JSON.stringify(xhr.response))
        expect(resp.statusCode).to.be.equal(200)
        var quotes = JSON.parse(resp.body)
        this.map.set('quotes', quotes)
    })

    cy.get('body home-page')
        .shadow()
        .find('game-view')
        .shadow()
        .find('div[class="content-container"] > wc-text-highlightable')
        .shadow()
        .find('[data-qa="quote-text"]').as('text')
        .invoke('text').then(text => {
            this.map.set('writedText', text.trim())
        })

    cy.get('body home-page')
        .shadow()
        .find('game-view')
        .shadow()
        .find('div[class="content-container"]')
        .find('[data-qa="quote-author"]').as('quoteAuthor')
        .invoke('text').then(quoteAuthor => {
            this.map.set('quoteAuthor', quoteAuthor.trim())
        })
})

When('I see a text', function () {
    cy.get('@text').should('exist').should('be.visible')
})

Then('I write the text', function () {
    cy.log(this.map)
    const text = this.map.get('writedText')
    cy.get('body home-page')
        .shadow()
        .find('game-view')
        .shadow()
        .find('div[class="content-container"]')
        .find('[data-qa="input-quote-text"]').as('writeText')
        .type(text, { force: true })

    cy.get('body home-page')
        .shadow()
        .find('game-view')
        .shadow()
        .find('div[class="content-container"]')
        .find('wc-text-highlightable')
        .shadow()
        .find('[data-qa="quote-text"')
        .find('[data-qa="quote-highLighted-text"]').invoke('text').then(highLightedText => {
            this.map.set('highLightedText', highLightedText)
        })
})

Then('I see a navbar', function () {
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

Then('the system return correct quote and author', function () {
    const quoteText = this.map.get('writedText')
    const quoteAuthor = this.map.get('quoteAuthor')
    const quotes = this.map.get('quotes')
    var quoteFound = false
    quotes.forEach(quote=>{
        if(quote.text == quoteText && quote.author == quoteAuthor){
            quoteFound = true
        }
    })
    expect(quoteFound).to.be.true
})

And('the system highlights the text writed', function () {
    var writedText = this.map.get('writedText')
    var highLightedText = this.map.get('highLightedText')

    expect(highLightedText.trim()).to.be.equal(writedText.trim())
    cy.log(this.map)
})





