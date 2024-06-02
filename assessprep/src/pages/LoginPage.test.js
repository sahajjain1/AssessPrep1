// test case based on functilnity and code coverage could have writen for other componets as well but needed more time for it. 
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from "react-router-dom";
import LoginPage from "./LoginPage";
import { useAuth } from "../hooks/useAuth";

jest.mock("../hooks/useAuth");

const mockLogin = jest.fn();
const mockNavigate = jest.fn();

beforeEach(() => {
  useAuth.mockReturnValue({
    login: mockLogin,
  });
});

test("renders login form", () => {
  render(
    <BrowserRouter>
      <LoginPage />
    </BrowserRouter>
  );

  expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
});

test("calls login function with correct arguments", () => {
  render(
    <BrowserRouter>
      <LoginPage />
    </BrowserRouter>
  );

  fireEvent.change(screen.getByLabelText(/email address/i), {
    target: { value: "sahajjain78@gmail.com" },
  });
  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: "Test@1234" },
  });

  fireEvent.click(screen.getByRole("button", { name: /submit/i }));

  expect(mockLogin).toHaveBeenCalledWith("sahajjain78@gmail.com", "Test@1234");
});

test("redirects to /books on successful login", () => {
  mockLogin.mockImplementation(() => {
    const token = "validtoken";
    localStorage.setItem("authToken", token);
    mockNavigate("/books");
  });

  render(
    <BrowserRouter>
      <LoginPage />
    </BrowserRouter>
  );

  fireEvent.change(screen.getByLabelText(/email address/i), {
    target: { value: "sahajjain78@gmail.com" },
  });
  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: "Test@1234" },
  });

  fireEvent.click(screen.getByRole("button", { name: /submit/i }));

  expect(mockLogin).toHaveBeenCalledWith("sahajjain78@gmail.com", "Test@1234");
  expect(mockNavigate).toHaveBeenCalledWith("/books");
});

test('does not redirect to /books on invalid credentials', () => {
  mockLogin.mockImplementation((email, password) => {
    if (email !== 'sahajjain78@gmail.com' || password !== 'Test@1234') {
      return; 
    }
    const token = 'validtoken';
    localStorage.setItem('authToken', token);
    mockNavigate('/books');
  });

  render(
    <BrowserRouter>
      <LoginPage />
    </BrowserRouter>
  );

  fireEvent.change(screen.getByLabelText(/email address/i), {
    target: { value: 'wronguser@example.com' },
  });
  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: 'wrongpassword' },
  });

  fireEvent.click(screen.getByRole('button', { name: /submit/i }));

  expect(mockLogin).toHaveBeenCalledWith('wronguser@example.com', 'wrongpassword');
  expect(mockNavigate).not.toHaveBeenCalled();
});