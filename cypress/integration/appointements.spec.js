describe("Interview", () => {
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");
  
    cy.visit("/");
  
    cy.contains("Monday");
   });
  it("should book an interview", () => {
   
    cy.contains(`[data-testid="day"]`, "Tuesday")
    .click()
   
    cy.get(':nth-child(1) > .appointment__add > .appointment__add-button')
    .click()

    let formInput = cy.get('[data-testid=student-name-input]')
    formInput.type("Anderson")

    let inverviwer1 = cy.get(':nth-child(1) > .interviewers__item')
    inverviwer1.click()
    let save = cy.get('.button--confirm')
    save.click()
    cy.get('h2.text--regular').contains('Anderson')


  })

  it("should edit an interview", () => {
   
    cy.contains(`[data-testid="day"]`, "Monday")
    .click()
    cy.get('.appointment__card').trigger('mousehover')
    cy.get('[data-button="edit"]').click({force: true})
    let formInput = cy.get('[data-testid=student-name-input]')
    formInput.clear()
    formInput.type("Bob")
     let inverviwer1 = cy.get(':nth-child(1) > .interviewers__item')
  
     inverviwer1.click()
     let save = cy.get('.button--confirm')
     save.click()
     cy.get('h2.text--regular').contains('Bob')

  })
  it("should cancel an interview", () => {
   
    cy.contains(`[data-testid="day"]`, "Monday")
    .click()
    cy.get('.appointment__card').trigger('mousehover')
    cy.get('[data-button="delete"]').click({force: true})
    cy.get('.appointment__actions > :nth-child(2)').click()
    cy.contains(".appointment__card--show", "Archie Cohen")
    .should("not.exist");
  })

})