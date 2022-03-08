import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Landing } from "./Landing";

test("Should render start button", () => {
  render(
    <BrowserRouter>
      <Landing />
    </BrowserRouter>
  );
  screen.getByText("Start!");
});
