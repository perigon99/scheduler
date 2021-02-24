const { wait } = require("@testing-library/react");
const { Children } = require("react");

describe("Navigation", () => {
  it("should visit root", () => {
    cy.request('GET',"http://localhost:8001/api/debug/reset");
    cy.visit("http://localhost:8000/")

  });
  it("Click on monday", () => {
    cy.contains('Monday')      // 6.
    .click()  
  });
  it("Click on Thuesday", () => {
    cy.get("li").contains("Tuesday").click()
  .should("have.css", "background-color", "rgb(242, 242, 242)");
  });
  it("Check li in thusdays", () => {
    cy.contains(`[data-testid="day"]`, "Tuesday")
    .click()
    .wait(200)
    cy.get(":nth-child(2) > h2.day-list__item").should("have.class", "day-list__item--selected")
    
  });
});

