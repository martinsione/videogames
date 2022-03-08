import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Layout } from "./Layout";

describe("Layout", () => {
  const setup = () =>
    render(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    );

  test("Should render all links", () => {
    setup();
    expect(
      screen.getByRole("link", { name: "Intro" }).getAttribute("href")
    ).toBe("/");
    expect(
      screen.getByRole("link", { name: "Games" }).getAttribute("href")
    ).toBe("/games");
    expect(
      screen.getByRole("link", { name: "Add Game" }).getAttribute("href")
    ).toBe("/games/add");
    expect(
      screen.getByRole("link", { name: "About" }).getAttribute("href")
    ).toBe("/about");
  });
});
