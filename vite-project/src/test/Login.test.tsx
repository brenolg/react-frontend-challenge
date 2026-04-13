import Login from "@/pages/Login";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

// mock do navigate
const mockNavigate = vi.fn();

vi.mock("@tanstack/react-router", () => ({
  useNavigate: () => mockNavigate,
}));

describe("Login Page", () => {
  beforeEach(() => {
    localStorage.clear();
    mockNavigate.mockClear();
  });

  it("deve renderizar inputs e botão", () => {
    render(<Login />);

    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Senha")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /entrar/i })).toBeInTheDocument();
  });

  it("deve permitir digitar nos inputs", async () => {
    render(<Login />);

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Senha");

    await userEvent.type(emailInput, "admin@email.com");
    await userEvent.type(passwordInput, "123456");

    expect(emailInput).toHaveValue("admin@email.com");
    expect(passwordInput).toHaveValue("123456");
  });

  it("deve fazer login e salvar token", async () => {
    render(<Login />);

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Senha");
    const button = screen.getByRole("button", { name: /entrar/i });

    await userEvent.type(emailInput, "admin@email.com");
    await userEvent.type(passwordInput, "123456");

    await userEvent.click(button);

    await vi.waitFor(() => {
      expect(localStorage.getItem("token")).toBe("fake-jwt-token");
    });

    expect(mockNavigate).toHaveBeenCalledWith({ to: "/home" });
  });

  it("não deve logar com campos vazios", async () => {
    render(<Login />);

    const button = screen.getByRole("button", { name: /entrar/i });

    await userEvent.click(button);

    expect(localStorage.getItem("token")).toBeNull();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("deve mostrar erro quando email é inválido", async () => {
    render(<Login />);

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Senha");
    const button = screen.getByRole("button", { name: /entrar/i });

    // email inválido
    await userEvent.type(emailInput, "email-invalido");
    await userEvent.type(passwordInput, "123456");

    await userEvent.click(button);

    expect(await screen.findByText("Email inválido")).toBeInTheDocument();
  });
});
