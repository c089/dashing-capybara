# Dashing Capybara

* _dashing_: spirited, audacious and full of high spirits
* _capybara_: a rodent that [looks like Rafel Nadal][capys]

## Introduction

Dashing Capybara is a framework for building custom dashboards. It consists of
a REST API to push data and a Publish/Subscribe API to allow clients to receive
updates of that data instantly.

## Getting started

* grab dependencies: npm install
* run the server: node app
* open http://localhost:3000/ and see the example

## Architecture

Dashing Capybara is implemented as a full-stack JavaScript application based on
[Node.js][node], [Express][express] and [Faye][faye]. It exposes two APIs:

* A REST API to get data into the system, see test/features/api.feature.
* A publish/subscribe API to allows clients to subscribe to any changes made to
  the data. See test/features/pubsub.feature.

## Status

Alpha: The implementation is incomplete and the APIs will change.

Missing bits:

* validate incoming data
* add timestamps to incoming data
* persistent storage engine based on redis
* client library to hide faye implementation details
* fancy example application
* authentication/authorization

[node]: http://faye.jcoglan.com/
[express]: http://expressjs.com/
[faye]: http://faye.jcoglan.com/
[capys]: http://capybarasthatlooklikerafaelnadal.tumblr.com/
