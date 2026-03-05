import SearchBar from "@/components/SearchBar";
import { categories } from "@/data/sweets";
import { fireEvent, render, screen } from "@testing-library/react";

function setup(props?: Partial<React.ComponentProps<typeof SearchBar>>) {
  const defaultProps: React.ComponentProps<typeof SearchBar> = {
    searchTerm: "",
    onSearchChange: jest.fn(),
    selectedCategory: "",
    onCategoryChange: jest.fn(),
    totalSweets: 10,
    filteredCount: 10,
  };
  return render(<SearchBar {...defaultProps} {...props} />);
}

describe("SearchBar", () => {
  it("toggles filter panel open/close", () => {
    setup();
    const toggleButton = screen.getByRole("button", { name: /Filtrar por categoria/ });

    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Categorias")).toBeInTheDocument();

    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveAttribute("aria-expanded", "false");
  });

  it("closes filter when a category is selected", () => {
    const onCategoryChange = jest.fn();
    setup({ onCategoryChange });

    const toggleButton = screen.getByRole("button", { name: /Filtrar por categoria/ });
    fireEvent.click(toggleButton);

    const firstCategoryKey = Object.keys(categories)[0];
    const firstCategoryLabel = categories[firstCategoryKey];

    fireEvent.click(screen.getByRole("button", { name: firstCategoryLabel }));
    expect(onCategoryChange).toHaveBeenCalledWith(firstCategoryKey);
    expect(toggleButton).toHaveAttribute("aria-expanded", "false");
  });

  it("clears search input when clear button is clicked", () => {
    const onSearchChange = jest.fn();
    setup({ searchTerm: "brigadeiro", onSearchChange });

    fireEvent.click(screen.getByLabelText("Limpar busca"));
    expect(onSearchChange).toHaveBeenCalledWith("");
  });

  it("calls onSearchChange when typing", () => {
    const onSearchChange = jest.fn();
    setup({ onSearchChange });

    const input = screen.getByPlaceholderText("Buscar doce por nome...");
    fireEvent.change(input, { target: { value: "beijinho" } });
    expect(onSearchChange).toHaveBeenCalledWith("beijinho");
  });

  it("highlights selected category", () => {
    const selectedKey = Object.keys(categories)[1];
    setup({ selectedCategory: selectedKey });

    fireEvent.click(screen.getByRole("button", { name: /Filtrar por categoria/ }));

    const label = categories[selectedKey];
    const chipButton = screen.getByRole("button", { name: label });
    expect(chipButton.className).toMatch(/bg-primary-500/);
  });
});
