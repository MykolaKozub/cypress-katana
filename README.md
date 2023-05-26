# Cypress Katana

Cypress Katana is a test suite for automated testing.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Running Tests](#running-tests)
- [Contributing](#contributing)
- [Idea](#idea)
- [License](#license)

## Installation

To install Cypress Katana, follow the steps below:

1. Clone this repository to a local directory:

 `  ```bash
   git clone https://github.com/NikolayKozub/cypress-katana.git
   `
2.Install the required dependencies: 
`npm ci`

## Configuration
To configure Cypress Katana, follow the steps below:

Create a local file named cypress-katana/cypress.env.json

Add the required configuration variables to the cypress.env.json file. The file should have the following structure:
`
{
  "username": "testUser...",
  "password": "pass..."
}
`
## Running Tests
To run the tests in Cypress Katana, use the following command:
`npx run cypress open`
This command will open the Cypress Test Runner, where you can select and run the desired tests interactively.

## Idea 
Idea - use 'easy' way to fill form and check final results.
<img width="664" alt="image" src="https://github.com/MykolaKozub/cypress-katana/assets/26719869/6e5d6abf-0d54-4e3b-846e-7303c00fc81f">
1. Try to use only data-* 
2. All Forms it's objects and we pass the data like object to fill it

<pre>
```
 import { fullBaseCustomerData } from '../../../fixtures/customer/customer-data' // test data
 import CustomerPage from '../../../support/customer/customer-page'// saving all methods for fill form

// spec.ts - test file 
 CustomerPage.fillMainForm(fullBaseCustomerData().customer)
```
</pre>

## License
This project is licensed under the MIT License.
