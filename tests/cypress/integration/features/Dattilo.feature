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


    Scenario: current letter
        Given I access to app
        Then the system show the next letter

    Scenario: mobile navBar
        Given On mobile device
        When I access to app
        Then I see a menu closed that contain navbar


    Scenario: navbar
        Given I access to app
        Then I see a navbar