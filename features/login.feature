Feature: Login

  Scenario: Go directly to login page and attempt to login
    Given I navigate to the login page
    When I enter my credentials
    Then I expect to be taken to the landing page

  Scenario: Go to a page that requires authentication before access is granted
    Given I navigate to a page that requires authentication
    When I see the login page
    And I enter my credentials
    Then I should see the page that was initially requested