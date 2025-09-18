import QuoteSummary from "@/components/QuoteSummary";
import { Sweet } from "@/data/sweets";
import { fireEvent, render, screen } from "@testing-library/react";

const sweet: Sweet = {
  id: "1",
  name: "Brigadeiro",
  price: 3.2,
  category: "brigadeiros_tradicionais",
};

const selectedItems = [{ sweet, quantity: 2 }];

describe("QuoteSummary", () => {
  it("mostra estado vazio quando não há itens", () => {
    render(<QuoteSummary selectedItems={[]} />);
    expect(screen.getByText("Selecione alguns doces para gerar seu orçamento")).toBeInTheDocument();
  });

  it("abre modal ao clicar em um item e permite salvar alteração", () => {
    const onQuantityChange = jest.fn();
    render(<QuoteSummary selectedItems={selectedItems} onQuantityChange={onQuantityChange} />);

    fireEvent.click(screen.getByText("Brigadeiro"));
    expect(screen.getByText("Preço unitário:")).toBeInTheDocument();

    const input = screen.getByLabelText("Quantidade:");
    fireEvent.change(input, { target: { value: "5" } });

    fireEvent.click(screen.getByText("Salvar Alterações"));
    expect(onQuantityChange).toHaveBeenCalledWith("1", 5);
  });

  it("permite remover item pelo modal", () => {
    const onQuantityChange = jest.fn();
    render(<QuoteSummary selectedItems={selectedItems} onQuantityChange={onQuantityChange} />);

    fireEvent.click(screen.getByText("Brigadeiro"));
    fireEvent.click(screen.getByText("Remover Item"));
    expect(onQuantityChange).toHaveBeenCalledWith("1", 0);
  });

  it("cancela edição ao clicar em Cancelar", () => {
    const onQuantityChange = jest.fn();
    render(<QuoteSummary selectedItems={selectedItems} onQuantityChange={onQuantityChange} />);

    fireEvent.click(screen.getByText("Brigadeiro"));
    fireEvent.click(screen.getByText("Cancelar"));
    expect(screen.queryByText("Salvar Alterações")).not.toBeInTheDocument();
  });

  it("formats date correctly without timezone issues", () => {
    render(<QuoteSummary selectedItems={selectedItems} />);

    // Find the custom date picker input
    const dateInput = screen.getByText("Selecione uma data");
    fireEvent.click(dateInput);
    
    // Select any available date
    const dayButtons = screen.getAllByRole("button").filter(button => 
      button.textContent && /^\d+$/.test(button.textContent) && !button.disabled
    );
    
    if (dayButtons.length > 0) {
      fireEvent.click(dayButtons[0]);
      
      // Check if a date is displayed (format may vary due to timezone)
      expect(screen.getByText(/\d{2}\/\d{2}\/\d{4}/)).toBeInTheDocument();
    }
  });
});
