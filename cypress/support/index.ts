import './commands'
import 'cypress-real-events/support'

Cypress.Cookies.defaults({
  preserve: ['katana_auth'],
})
