const { Before } = require("cypress-cucumber-preprocessor/steps")

Before(function () {
    var map = new Map()
    cy.wrap(map).as('map')
})