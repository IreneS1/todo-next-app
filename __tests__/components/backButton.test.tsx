import React from "react";
import { render, screen } from "@testing-library/react";
import BackButton from "../../components/BackButton";

describe("The back button component", () => {
  it("renders back button", () => {
    render(<BackButton />);
    expect(screen.getByTestId("ArrowBackIosNewIcon")).toBeTruthy();
  });
});
