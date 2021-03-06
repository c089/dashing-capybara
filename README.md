# Dashing Capybara [![Build Status][travis.png]][travis]

* _dashing_: spirited, audacious and full of high spirits
* _capybara_: a rodent that [looks like Rafel Nadal][capys]

Dashing Capybara is a library to make it easy to push JSON data to custom
views, such as a dashboards or widgets in a browser. It consists of a REST API
to push data and a Publish/Subscribe API to allow clients to receive updates of
that data instantly.

Following the UNIX tradition and node.js way of "doing one thing and doing it
right" it deliberately does _not_ fetch, aggregate or analyze data. All of
these things should be done elsewhere.

## Getting started

Run the server, then follow the instructions on [the example page](http://localhost:3000).
```sh
git clone git://github.com/c089/dashing-capybara.git && cd dashing-capybara
npm install && npm start
```


## Architecture

Dashing Capybara is implemented as a full-stack JavaScript application based on
[Node.js][node], [Express][express] and [Faye][faye]. It exposes two APIs:

* A REST API to get data into the system, see test/features/api.feature.
* A publish/subscribe API to allows clients to subscribe to any changes made to
  the data. See test/features/pubsub.feature.

## Status

Alpha: The implementation is incomplete and the APIs will change.

### Roadmap

* validate incoming data (well formatted, maximum size)
* persistent storage engine based on redis
* retention rules (clean old values based on timestamp or maximum entries)
* fancy example application
* authentication/authorization

### Cleanups
* upgrade grunt to 0.4.x
* consistency: 2 spaces indentation
* consistency: use camel case instead of underscores for method names

## Inspiration / Competition / Alternatives

* [Ducksboard][ducksboard] and [Geckoboard][geckoboard] are proprietary turnkey
  solutions allowing you to sign up and click together widgets and easily build
  dashboards without any tech knowledge. While I would love to see a project
  like this built on dashing-capybara, it is currently out of the scope of this
  project - you have to supply the data yourself using the API.
* [Dashing][dashing] is a full framework to build dashboards and comes with
  beautiful widgets. However, it does too many things tightly coupled for my
  taste.
* [Graphene][graphene] "is a realtime dashboard & graphing toolkit based on D3
  and Backbone". It is tightly coupled to Graphite (dashing-capybara tries to
  decouple from both data providing backends as well as front-end libraries)
  and it's "realtime" is achieved by interval polling (where as
  dashing-capybara uses push technologies).
* [JSlate][jslate] claims to offer "dashboarding with no restrictions" but is
  built on technologies I personally dislike enough to not care.

[node]: http://faye.jcoglan.com/
[express]: http://expressjs.com/
[faye]: http://faye.jcoglan.com/
[capys]: http://capybarasthatlooklikerafaelnadal.tumblr.com/
[ducksboard]: http://ducksboard.com/
[geckoboard]: http://www.geckoboard.com/
[graphene]: https://github.com/jondot/graphene
[jslate]: http://jslate.com/
[travis.png]: https://secure.travis-ci.org/c089/dashing-capybara.png
[travis]: http://travis-ci.org/c089/dashing-capybara
[dashing]: http://shopify.github.io/dashing/
