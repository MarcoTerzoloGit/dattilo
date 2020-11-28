Feature: KeypressApp

    Test e2e for keyPressApp

    @focus
    Scenario: write text test
        Given I access to app
        When I see a text
        Then I write the text


    Scenario: navbar
        Given I access to app
        Then I see a navbar