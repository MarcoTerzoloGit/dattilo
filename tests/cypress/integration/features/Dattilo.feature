Feature: Dattilo

    Test e2e for keyPressApp


    Scenario: write text test
        Given I access to app
        When I see a text
        Then I write the text
            And the system highlights the text writed

    Scenario: quotes api test
        Given I access to app
        Then the system return correct quote and author

    Scenario: navbar
        Given I access to app
        Then I see a navbar