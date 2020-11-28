Feature: KeypressApp

    Test e2e for keyPressApp


    # Scenario: write text test
    #     Given I access to app
    #     When I see a text
    #     Then I write the text

    @focus
    Scenario: navbar
        Given I access to app
        Then I see a navbar