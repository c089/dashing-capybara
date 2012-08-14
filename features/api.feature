Feature: RESTful data API

    Scenario: Creating a data resource
        When I POST to /data
        Then the status should be 201
        And the result should include an id
