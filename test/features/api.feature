Feature: RESTful data API
  As a user who has interesting data
  I want to use a simple RESTful API
  to get data into the system

  The API uses the HTTP verbs POST, GET, PUT and DELETE on the data endpoint
  like this:

             | POST         | GET        | PUT            | DELETE
  /data      | create store | get stores | error          | error
  /data/[id] | add value    | get values | replace value  | delete data

  Scenario: Creating a data store
    When I POST to /data with empty body
    Then the status should be 201
    And the result should include an id

  Scenario: A single value can be added to a data store
    Given an existing data store with id 1
    When I POST to /data/1 with body {"value": "foo"}
    Then the status should be 200
    When I GET /data/1
    Then the status should be 200
    And the result should be a single data point
    And the result should contain value "foo"

  Scenario: Multiple values can be added to a data store
    Given an existing data store with id 1
    When I POST to /data/1 with body [{"value": 1}, {"value": 2}]
    Then the status should be 200
    When I GET /data/1
    Then the status should be 200
    And the result should have size 2
    And the result should contain value 1
    And the result should contain value 2

  Scenario: All values can be replaced for a data store
    Given an existing data store with id 1 and data [{"value": "old"}]
    When I PUT to /data/1 with body [{"value": "new1"}, {"value": "new2"}]
    Then the status should be 200
    When I GET /data/1
    Then the status should be 200
    And the result should have size 2
    And the result should contain value "new1"
    And the result should contain value "new2"
    And the result should not contain value "old"

  Scenario: When no timestamp is included, it is set to the current time
    Given an existing data store with id 1
    When I POST to /data/1 with body {"value": "foo"}
    When I GET /data/1
    Then the first value should contain a timestamp

  Scenario: A timestamp can be included when adding data
    Given an existing data store with id 1
    When I POST to /data/1 with body {"value": "foo", "timestamp": "2012-09-15T15:46:20.889Z"}
    When I GET /data/1
    Then the first value should contain a timestamp
    And the result should contain {"value": "foo", "timestamp": "2012-09-15T15:46:20.889Z"}

  Scenario: Timestamps will always be returned in ISO-Format
    Given an existing data store with id 1
    When I POST to /data/1 with body {"value": 1, "timestamp": 1347728775000}
    And I GET /data/1
    Then the result should contain {"value": 1, "timestamp": "2012-09-15T17:06:15.000Z"}
