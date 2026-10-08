import { beforeEach, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import ProductPageTest from "../test/ProductPageTest";
import { getProducts } from "../service/productService";

vi.mock("../service/productService", () => ({
  getProducts: vi.fn(),
}));

const testProducts = [
  {
    id: 1,
    name: "Röd cykel",
    description: "Snabb och rolig",
    price: 1200,
    stock: 5,
    category: "Fordon",
    imgUrl: "https://example.com/red-bike.jpg",
  },
  {
    id: 2,
    name: "Blå hjälm",
    description: "Skyddar på cykelturen",
    price: 300,
    stock: 8,
    category: "Tillbehör",
    imgUrl: "https://example.com/blue-helmet.jpg",
  },
  {
    id: 3,
    name: "Gul cykel",
    description: "Lugn stadscykel",
    price: 1500,
    stock: 3,
    category: "Fordon",
    imgUrl: "https://example.com/yellow-bike.jpg",
  },
];

const getProductsMock = vi.mocked(getProducts);

beforeEach(() => {
  sessionStorage.clear();
  getProductsMock.mockReset();
  getProductsMock.mockResolvedValue(testProducts);
});

it("Searches by product name and description", async () => {
  render(<ProductPageTest />);

  const searchInput = await screen.findByRole("searchbox", {
    name: /sök produkter/i,
  });

  fireEvent.change(searchInput, { target: { value: "RÖD" } });
  expect(
    screen.getByRole("heading", { name: "Röd cykel" }),
  ).toBeInTheDocument();
  expect(
    screen.queryByRole("heading", { name: "Blå hjälm" }),
  ).not.toBeInTheDocument();

  fireEvent.change(searchInput, { target: { value: "skyddar" } });
  expect(
    screen.getByRole("heading", { name: "Blå hjälm" }),
  ).toBeInTheDocument();
  expect(
    screen.queryByRole("heading", { name: "Röd cykel" }),
  ).not.toBeInTheDocument();
});

it("Combines search with the selected category", async () => {
  render(<ProductPageTest />);

  await screen.findByRole("heading", { name: "Röd cykel" });

  fireEvent.change(screen.getByRole("combobox"), {
    target: { value: "Tillbehör" },
  });
  fireEvent.change(screen.getByRole("searchbox", { name: /sök produkter/i }), {
    target: { value: "cykel" },
  });

  expect(
    screen.getByRole("heading", { name: "Blå hjälm" }),
  ).toBeInTheDocument();
  expect(
    screen.queryByRole("heading", { name: "Röd cykel" }),
  ).not.toBeInTheDocument();
  expect(
    screen.queryByRole("heading", { name: "Gul cykel" }),
  ).not.toBeInTheDocument();
});

it("Shows a message when no products match and resets an empty search", async () => {
  render(<ProductPageTest />);

  const searchInput = await screen.findByRole("searchbox", {
    name: /sök produkter/i,
  });

  fireEvent.change(searchInput, { target: { value: "saknas" } });
  expect(screen.getByText("Inga produkter hittades")).toBeInTheDocument();

  fireEvent.change(searchInput, { target: { value: "" } });
  expect(screen.queryByText("Inga produkter hittades")).not.toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: "Röd cykel" }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: "Blå hjälm" }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: "Gul cykel" }),
  ).toBeInTheDocument();
});
