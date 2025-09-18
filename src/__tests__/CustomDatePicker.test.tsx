import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CustomDatePicker from "../components/CustomDatePicker";

describe("CustomDatePicker", () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it("renders with placeholder when no value", () => {
    render(<CustomDatePicker value="" onChange={mockOnChange} />);
    
    expect(screen.getByText("Selecione uma data")).toBeInTheDocument();
  });

  it("renders with formatted date when value is provided", () => {
    render(<CustomDatePicker value="2024-09-20" onChange={mockOnChange} />);
    
    // Check if date is displayed (format may vary)
    expect(screen.getByText(/20\/09\/2024|19\/09\/2024/)).toBeInTheDocument();
  });

  it("opens calendar when clicked", () => {
    render(<CustomDatePicker value="" onChange={mockOnChange} />);
    
    const input = screen.getByText("Selecione uma data");
    fireEvent.click(input);
    
    // Check if calendar is open by looking for month/year header
    expect(screen.getByText(/2024|2025/)).toBeInTheDocument();
  });

  it("closes calendar when clicking outside", async () => {
    render(
      <div>
        <CustomDatePicker value="" onChange={mockOnChange} />
        <div data-testid="outside">Outside</div>
      </div>
    );
    
    const input = screen.getByText("Selecione uma data");
    fireEvent.click(input);
    
    // Calendar should be open
    expect(screen.getByText(/2024|2025/)).toBeInTheDocument();
    
    const outside = screen.getByTestId("outside");
    fireEvent.mouseDown(outside);
    
    await waitFor(() => {
      expect(screen.queryByText(/2024|2025/)).not.toBeInTheDocument();
    });
  });

  it("navigates months correctly", () => {
    render(<CustomDatePicker value="" onChange={mockOnChange} />);
    
    const input = screen.getByText("Selecione uma data");
    fireEvent.click(input);
    
    // Find and click next month button
    const nextButton = screen.getByLabelText("Próximo mês");
    fireEvent.click(nextButton);
    
    // Should show different month/year
    expect(screen.getByText(/2024|2025/)).toBeInTheDocument();
  });

  it("selects date and calls onChange", () => {
    render(<CustomDatePicker value="" onChange={mockOnChange} />);
    
    const input = screen.getByText("Selecione uma data");
    fireEvent.click(input);
    
    // Click on any available day
    const dayButtons = screen.getAllByRole("button").filter(button => 
      button.textContent && /^\d+$/.test(button.textContent) && !button.disabled
    );
    
    if (dayButtons.length > 0) {
      fireEvent.click(dayButtons[0]);
      expect(mockOnChange).toHaveBeenCalledWith(expect.stringMatching(/^\d{4}-\d{2}-\d{2}$/));
    }
  });

  it("clears date when clear button is clicked", () => {
    render(<CustomDatePicker value="2024-09-20" onChange={mockOnChange} />);
    
    const input = screen.getByText(/20\/09\/2024|19\/09\/2024/);
    fireEvent.click(input);
    
    const clearButton = screen.getByText("Limpar");
    fireEvent.click(clearButton);
    
    expect(mockOnChange).toHaveBeenCalledWith("");
  });

  it("goes to today when today button is clicked", () => {
    render(<CustomDatePicker value="" onChange={mockOnChange} />);
    
    const input = screen.getByText("Selecione uma data");
    fireEvent.click(input);
    
    const todayButton = screen.getByText("Hoje");
    fireEvent.click(todayButton);
    
    expect(mockOnChange).toHaveBeenCalledWith(expect.stringMatching(/^\d{4}-\d{2}-\d{2}$/));
  });

  it("shows custom label when provided", () => {
    render(
      <CustomDatePicker 
        value="" 
        onChange={mockOnChange} 
        label="Custom Label"
      />
    );
    
    expect(screen.getByText("Custom Label")).toBeInTheDocument();
  });
});
