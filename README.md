# Vending Machine TDD Project

## Scope 
Mock coding interview question: `implement a vending machine in JavaScript.`

    The vending machine must be a Javascript class.
    No interface is required. Only tests to prove is works.
___
### Requirements:
The project must:
 * Have at least 10 well-formed, passing tests
 * Contain a reasonably DRY (Don't Repeat Yourself) implementation, though the tests can be verbose
 * Have a screenshot (or screenshots) in its README of the test output in your terminal
___
### Functionality:
The project must:
 * Have functionality for printing inventory
 * Have functionality for refilling inventory
 * Have functionality for re-supplying change
 * Have functionality for dispensing inventory based on payment
 * Have functionality for returning change as coins (eg. $0.35 is 1 quarter and 1 dime)

# Getting Started

    To get started you must first fork and clone the repository to your machine.

## Installation
    cd /path/to/repository

    npm install

    and Boom! you are ready to go.

# Running Tests

to run a test you must first ensure you are inside the repository then run the following command: 

```jest```

if you do not have jest installed globally and your `npm is version @5.2.0 or greater`: 

```npx jest```

# Summary

This repository consists of two main files and one data file:
* `vending-machine.js` 
* `vending-machine.spec.js`
* `data.json`

```vending-machine.js``` 

        contains the javascript class of VendingMachine. It contains the necessary methods for completing each test outlined in `vending-machine-spec.js`.

`vending-machine-spec.js` 

        contains of description of what tests are being run and their expected outcomes.

`data.json` 

        contains the mock data used for running the tests.

# Screenshots

## Test

![Tests](//VendingMachine/screenshots/jest-test.png)



