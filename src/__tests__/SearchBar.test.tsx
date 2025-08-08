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
    const toggleButton = screen.getByText("Filtrar por categoria");

    fireEvent.click(toggleButton);
    expect(screen.getByText("Todos")).toBeInTheDocument();

    fireEvent.click(toggleButton);
    expect(screen.queryByText("Todos")).not.toBeInTheDocument();
  });

  it("closes filter when a category is selected", () => {
    const onCategoryChange = jest.fn();
    setup({ onCategoryChange });

    const toggleButton = screen.getByText("Filtrar por categoria");
    fireEvent.click(toggleButton);

    const firstCategoryKey = Object.keys(categories)[0];
    const firstCategoryLabel = categories[firstCategoryKey];

    fireEvent.click(screen.getByText(firstCategoryLabel));
    expect(onCategoryChange).toHaveBeenCalledWith(firstCategoryKey);
    expect(screen.queryByText("Todos")).not.toBeInTheDocument();
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

    // expand filter so the buttons render
    fireEvent.click(screen.getByText("Filtrar por categoria"));

    const label = categories[selectedKey];
    const button = screen.getByText(label);
    expect(button.className).toMatch(/bg-primary-500/);
  });
});
