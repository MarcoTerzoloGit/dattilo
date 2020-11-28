import { Given, And, Then, When } from "cypress-cucumber-preprocessor/steps";

//test steps 
Given('I visit jw.org', function(){
    cy.visit('https://www.jw.org/it/')
    this.map.set('pino', 'ciao')
    cy.log(this.map)
})

When('I open the home page article', function(){
    cy.get('span[class="buttonText"]').contains('Per saperne di più').click()
})

Then('I see the article', function(){
    cy.get('h1[id="p1"]').should('exist')
})