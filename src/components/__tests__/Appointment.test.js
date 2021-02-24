import React from "react";
import { render, cleanup, fireEvent, getByText, waitForElement } from "@testing-library/react";

import Appointment from "components/Appointement/index";

afterEach(cleanup);

describe("Appointment", () => {
  it("renders without crashing", () => {
    render(<Appointment />);
  })   
});