Feature: googlefeature

    Scenario: read home page article
        Given I visit jw.org
        When I open the home page article
        Then I see the article