# Poker REST API

## Introduction

The idea was to reach multiple targets:

* Show algorithm capabilities as requested
* Also illustrate interesting solutions shared during the first meeting with Maxime: docker, typescript...

As a consequence, the project is:

* Based on Node.js
* Use restify to expose a REST WS (easier to test)
* Written in typescript to ensure code quality and lisiblity
* Build in docker to enable a quick and easy launch

Side observations:

* The project has been made with VSCode, and easier to test / debug with it
* As the cyclomatic complexity is not important, algorithm optimisation has not been my main target. Instead, I focused on code lisibility.

## Prerequisits

You need to have last versions of :

* NPM
* yarn (```npm install -g yarn```)
* newman (postman runner) (```npm install -g newman```)
* Python
* Docker (works well with Docker for windows if you are under windows)

## Installation

```bash
npm run restore-all
```

## Run

```bash
npm run build
docker-compose up
```

## Test

Play with this postman collection:

```bash
newman run .\tests\Poker.postman_collection.json
```

```raw
┌─────────────────────────┬──────────┬──────────┐
│                         │ executed │   failed │
├─────────────────────────┼──────────┼──────────┤
│              iterations │        1 │        0 │
├─────────────────────────┼──────────┼──────────┤
│                requests │       12 │        0 │
├─────────────────────────┼──────────┼──────────┤
│            test-scripts │       12 │        0 │
├─────────────────────────┼──────────┼──────────┤
│      prerequest-scripts │        0 │        0 │
├─────────────────────────┼──────────┼──────────┤
│              assertions │       45 │        0 │
├─────────────────────────┴──────────┴──────────┤
│ total run duration: 913ms                     │
├───────────────────────────────────────────────┤
│ total data received: 972B (approx)            │
├───────────────────────────────────────────────┤
│ average response time: 21ms                   │
└───────────────────────────────────────────────┘
```