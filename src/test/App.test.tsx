import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { expect, it } from "vitest";
import App from "../App";
import { server } from "../mocks/server";
import { HttpResponse } from "msw";
import { http } from "msw";

it("visar produkter för en inloggad användare", async () => {
  render(
    <MemoryRouter initialEntries={["/products"]}>
      <App />
    </MemoryRouter>,
  );

  expect(
    await screen.findByRole("heading", { name: "Cykel" }),
  ).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Hjälm" })).toBeInTheDocument();
});

it("visar ett felmeddelande när produkterna inte kan hämtas", async () => {
  server.use(
    http.get("*/products", () => {
      return HttpResponse.json({ message: "Server error" }, { status: 500 });
    }),
  );

  render(
    <MemoryRouter initialEntries={["/products"]}>
      <App />
    </MemoryRouter>,
  );

  expect(await screen.findByRole("alert")).toHaveTextContent(
    "Kunde inte hämta produkter",
  );
});

it("återställer den inloggade användaren vid lyckat svar från /auth/me", async () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>,
  );

  expect(
    await screen.findByRole("heading", {
      name: /Välkommen, mock-user!/i,
    }),
  ).toBeInTheDocument();

  expect(screen.getByRole("button", { name: "Logga ut" })).toBeInTheDocument();
});

it("betraktar användaren som utloggad vid 401 från /auth/me", async () => {
  server.use(
    http.get("*/auth/me", () => {
      return new HttpResponse(null, { status: 401 });
    }),
  );

  render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>,
  );

  expect(
    await screen.findByRole("heading", { name: "Logga in" }),
  ).toBeInTheDocument();

  expect(screen.getByRole("link", { name: "Logga in" })).toBeInTheDocument();

  expect(
    screen.queryByRole("button", { name: "Logga ut" }),
  ).not.toBeInTheDocument();
});
