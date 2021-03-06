interface Client {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  address: string;
  phone: string;
}

function formatPhoneNumber(phoneNumber: string) {
  return phoneNumber.length === 10
    ? `(${phoneNumber.substring(0, 3)}) ${phoneNumber.substring(
        3,
        6
      )}-${phoneNumber.substring(6, 10)}`
    : phoneNumber;
}

describe('Client', () => {
  const currentDate = new Date();
  const monthAbbrev = new Intl.DateTimeFormat('en-US', { month: 'long' })
    .format(currentDate)
    .substring(0, 3);

  beforeEach(() => {
    cy.fixture<Client>('clients').as('clients');
  });

  it('Navigate to Client page', function () {
    cy.visit('/client');
    cy.url().should('include', '/client');
  });

  it('Create new clients', function () {
    this.clients.forEach((client: Client) => {
      cy.get('[data-cy=clientCreate]').click();
      cy.get('[data-cy=clientFirstName] input')
        .type(client.firstName)
        .should('have.value', client.firstName);

      cy.get('[data-cy=clientLastName] input')
        .type(client.lastName)
        .should('have.value', client.lastName);

      cy.get('[data-cy=clientNumber] input')
        .type(client.phone)
        .should('have.value', formatPhoneNumber(client.phone));

      cy.get('[data-cy=clientEmail] input')
        .type(client.email)
        .should('have.value', client.email);

      cy.get('[data-cy=clientAddress] input')
        .type(client.address)
        .should('have.value', client.address);

      cy.get(`[data-cy=clientGender${client.gender}] input`)
        .check()
        .should('have.value', client.gender);

      cy.get('[aria-label="Choose date"]').click();
      cy.get(`[aria-label="${monthAbbrev} 22, ${currentDate.getFullYear()}"]`)
        .eq(1)
        .click();

      cy.get('[data-cy=clientNotification]')
        .parent()
        .click()
        .get('[data-cy=typeEmail]')
        .click();
      cy.get('[data-cy=clientNotification] input').should(
        'have.value',
        'email'
      );

      cy.intercept({
        method: 'POST',
        url: `${Cypress.env('API_BASE_URL')}/api/v1/customer`,
      }).as('createCustomer');
      cy.get('[data-cy=clientSubmit]').click();
      cy.wait('@createCustomer').its('response.statusCode').should('eq', 201);
    });
  });

  it('Sort clients by first name', function () {
    cy.intercept({
      method: 'GET',
      url: `${Cypress.env('API_BASE_URL')}/api/v1/customer?sortBy=firstName`,
    }).as('sortByFirstName');
    cy.get('[data-cy=clientSort]')
      .parent()
      .click()
      .get('[data-cy=sortFirstName]')
      .click();
    cy.wait('@sortByFirstName').its('response.statusCode').should('eq', 200);
  });

  it('Validate client info page', function () {
    this.clients.forEach((client: Client, index: number) => {
      cy.get(
        `div.MuiDataGrid-main div.MuiDataGrid-row[data-rowindex="${index}"] div.MuiDataGrid-cell[data-field="firstName"]`
      ).should('contain', client.firstName);
      cy.get(
        `div.MuiDataGrid-main div.MuiDataGrid-row[data-rowindex="${index}"] div.MuiDataGrid-cell[data-field="lastName"]`
      ).should('contain', client.lastName);

      cy.get('input.PrivateSwitchBase-input[type="checkbox"]')
        .check()
        .should('be.checked');
    });
  });

  it.skip('Validate appointment history');

  it('Show a warning on duplicate customer full name entry', function () {
    const [client] = this.clients;
    const { firstName, lastName } = client;

    cy.get('[data-cy=clientCreate]').click();
    cy.get('[data-cy=clientFirstName] input')
      .type(client.firstName)
      .should('have.value', client.firstName);

    cy.get('[data-cy=clientLastName] input')
      .type(client.lastName)
      .should('have.value', client.lastName);

    cy.get('[data-cy=clientNumber] input')
      .type(client.phone)
      .should('have.value', formatPhoneNumber(client.phone));

    cy.get('[data-cy=clientEmail] input')
      .type('random@email.com')
      .should('have.value', 'random@email.com');

    cy.get('[data-cy=clientAddress] input')
      .type(client.address)
      .should('have.value', client.address);

    cy.get(`[data-cy=clientGender${client.gender}] input`)
      .check()
      .should('have.value', client.gender);

    cy.get('[aria-label="Choose date"]').click();
    cy.get(`[aria-label="${monthAbbrev} 22, ${currentDate.getFullYear()}"]`)
      .eq(1)
      .click();

    cy.get('[data-cy=clientNotification]')
      .parent()
      .click()
      .get('[data-cy=typeEmail]')
      .click();
    cy.get('[data-cy=clientNotification] input').should('have.value', 'email');

    cy.intercept({
      method: 'POST',
      url: `${Cypress.env('API_BASE_URL')}/api/v1/customer`,
    }).as('createCustomer');

    cy.intercept({
      url: `${Cypress.env(
        'API_BASE_URL'
      )}/api/v1/customer/duplicate?firstName=${firstName}&lastName=${lastName}`,
    }).as('duplicateCustomerCheck');
    cy.get('[data-cy=clientSubmit]').click();
    cy.wait('@duplicateCustomerCheck')
      .its('response.statusCode')
      .should('eq', 200);

    cy.get(
      '.MuiButton-outlinedPrimary[data-cy=confirm-duplicate-customer]'
    ).click();
    cy.wait('@createCustomer').its('response.statusCode').should('eq', 201);
  });

  it('Delete clients', function () {
    cy.intercept({
      url: `${Cypress.env('API_BASE_URL')}/api/v1/customer`,
    }).as('fetchCustomers');
    cy.visit('/client');
    cy.url().should('include', '/client');
    cy.wait('@fetchCustomers').its('response.statusCode').should('eq', 200);

    this.clients.forEach((client: Client, index: number) => {
      cy.get(
        `div.MuiDataGrid-main div.MuiDataGrid-row[data-rowindex="${index}"] div.MuiDataGrid-cell[data-field="firstName"]`
      ).should('contain', client.firstName);
      cy.get(
        `div.MuiDataGrid-main div.MuiDataGrid-row[data-rowindex="${index}"] div.MuiDataGrid-cell[data-field="lastName"]`
      ).should('contain', client.lastName);

      cy.get('input.PrivateSwitchBase-input[type="checkbox"]')
        .check()
        .should('be.checked');
    });

    cy.intercept({
      method: 'DELETE',
      url: `${Cypress.env('API_BASE_URL')}/api/v1/customer`,
    }).as('deleteClientRecords');
    cy.get('button[data-cy="clientDelete"]').should('be.enabled').click();
    cy.wait('@deleteClientRecords')
      .its('response.statusCode')
      .should('eq', 200);
  });
});
