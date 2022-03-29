export interface User {
  login: string
  password: string
}

export const getEnvValue = (name): string => Cypress.env(`${name}`)

export const mainUser: User = {
  login: getEnvValue('username'),
  password: getEnvValue('password'),
}
