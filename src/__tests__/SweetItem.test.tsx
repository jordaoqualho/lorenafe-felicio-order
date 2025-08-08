import SweetItem from "@/components/SweetItem";
import { Sweet } from "@/data/sweets";
import { fireEvent, render, screen } from "@testing-library/react";

const sweet: Sweet = {
  id: "1",
  name: "Brigadeiro",
  price: 3.2,
  category: "brigadeiros_tradicionais",
  image: "/images/sweets/brigadeiro.jpeg",
};

describe("SweetItem", () => {
  it("calls onQuantityChange when increasing and keeps decrease disabled at 0", () => {
    const onQuantityChange = jest.fn();
    render(<SweetItem sweet={sweet} quantity={0} onQuantityChange={onQuantityChange} />);

    fireEvent.click(screen.getByLabelText("Aumentar quantidade de Brigadeiro"));
    expect(onQuantityChange).toHaveBeenCalledWith("1", 1);

    expect(screen.getByLabelText("Diminuir quantidade de Brigadeiro")).toBeDisabled();
  });

  it("decreases quantity when possible", () => {
    const onQuantityChange = jest.fn();
    render(<SweetItem sweet={sweet} quantity={2} onQuantityChange={onQuantityChange} />);

    fireEvent.click(screen.getByLabelText("Diminuir quantidade de Brigadeiro"));
    expect(onQuantityChange).toHaveBeenCalledWith("1", 1);
  });

  it("opens bulk edit on quantity click and submits value", () => {
    const onQuantityChange = jest.fn();
    render(<SweetItem sweet={sweet} quantity={2} onQuantityChange={onQuantityChange} />);

    fireEvent.click(screen.getByTitle("Clique para editar quantidade"));
    const input = screen.getByLabelText(`Editar quantidade de ${sweet.name}`);
    fireEvent.change(input, { target: { value: "7" } });
    fireEvent.click(screen.getByRole("button", { name: /Confirmar/i }));

    expect(onQuantityChange).toHaveBeenCalledWith("1", 7);
  });

  it("cancels bulk edit without changing value", () => {
    const onQuantityChange = jest.fn();
    render(<SweetItem sweet={sweet} quantity={5} onQuantityChange={onQuantityChange} />);

    fireEvent.click(screen.getByTitle("Clique para editar quantidade"));
    fireEvent.click(screen.getByRole("button", { name: /Cancelar/i }));

    expect(onQuantityChange).not.toHaveBeenCalled();
  });
});
