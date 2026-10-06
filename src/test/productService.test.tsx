import { expect, it, vi } from "vitest";
import ProductCard from "../components/ProductCard";
import { fireEvent, render, screen } from "@testing-library/react";

const testProduct = {
  id: 1,
  name: "Test",
  description: "A tested product",
  price: 30,
  stock: 100,
  imgUrl: "https://example-image.com",
};

const onAdd = () => {};

it("Displays product information", () => {
  render(<ProductCard product={testProduct} onAdd={onAdd} />);
  expect(screen.getByText("Test")).toBeInTheDocument();
  expect(screen.getByText("A tested product")).toBeInTheDocument();
  expect(screen.getByText(/30/)).toBeInTheDocument();
});

it("Should call onAdd with the product when the button is clicked", () => {
  const onAddMock = vi.fn();
  render(<ProductCard product={testProduct} onAdd={onAddMock} />);
  const addButton = screen.getByRole("button", { name: /lägg i kundvagnen/i });
  fireEvent.click(addButton);
  expect(onAddMock).toHaveBeenCalledTimes(1);
  expect(onAddMock).toHaveBeenCalledWith(testProduct);
});
