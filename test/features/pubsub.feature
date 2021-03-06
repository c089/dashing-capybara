Feature: Publish/Subscribe
  As a client application
  I want to subscribe to a data store
  so that I get realtime updates when data changes.

  Scenario: Subscribing to an empty data store
    Given an existing data store with id 1
    When I subscribe to 1
    Then I am subscribed

  Scenario: Subscribing to a non-existing data store fails
    When I subscribe to foo
    Then I receive an error: "Unknown store: foo."

  Scenario: Subscribing to a store with existing data
    Given an existing data store with id 1 and data [{"value": 1}]
    And I am subscribed to my private channel
    When I subscribe to 1
    Then I receive a message containing {"storeId": "1", "data": [ {"value": 1} ] }

  Scenario: Receiving updates
    Given an existing data store with id 1
    When I subscribe to 1
    And I POST to /data/1 with body {"value": 1, "timestamp": "2012-09-15T12:30:00.000Z"}
    Then I receive a message containing {"storeId": "1", "data": [ {"value": 1, "timestamp": "2012-09-15T12:30:00.000Z"} ]}
