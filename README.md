# Cypress Katana

Cypress Katana is a test suite for automated testing.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Running Tests](#running-tests)
- [Contributing](#contributing)
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

## License
This project is licensed under the MIT License.
