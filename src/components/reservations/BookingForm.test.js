import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import BookingForm from "./BookingForm";

jest.mock("../../api.js", () => ({
  fetchAPI: jest.fn(),
  submitAPI: jest.fn(),
}));

const { fetchAPI } = require("../../api.js");

describe("BookingForm", () => {
  const mockOnContinue = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    fetchAPI.mockReturnValue(["17:00", "18:00", "19:00"]);
  });

  test("renders all headings", () => {
    render(<BookingForm onContinue={mockOnContinue} />);

    expect(screen.getByText("Select Date")).toBeInTheDocument();
    expect(screen.getByText("Select Time")).toBeInTheDocument();
    expect(screen.getByText("Continue to Guest Details")).toBeInTheDocument();
  });

  test("continue button is disabled initially", () => {
    render(<BookingForm onContinue={mockOnContinue} />);

    expect(screen.getByText("Continue to Guest Details")).toBeDisabled();
  });

  test("shows date selection prompt initially", () => {
    render(<BookingForm onContinue={mockOnContinue} />);

    expect(screen.getByText("Please select a date first.")).toBeInTheDocument();
  });

  test("clicking date calls fetchAPI", () => {
    render(<BookingForm onContinue={mockOnContinue} />);

    const dateButtons = screen.getAllByTestId("date-button");
    fireEvent.click(dateButtons[0]);

    expect(fetchAPI).toHaveBeenCalledTimes(1);
    expect(fetchAPI).toHaveBeenCalledWith(expect.any(Date));
  });

  test("displays available times after selecting date", async () => {
    render(<BookingForm onContinue={mockOnContinue} />);

    const dateButtons = screen.getAllByTestId("date-button");
    fireEvent.click(dateButtons[0]);

    await waitFor(() => {
      expect(screen.getByText("17:00")).toBeInTheDocument();
    });

    expect(screen.getByText("18:00")).toBeInTheDocument();
    expect(screen.getByText("19:00")).toBeInTheDocument();
  });

  test("continue button enables after selecting date and time", async () => {
    render(<BookingForm onContinue={mockOnContinue} />);

    const dateButtons = screen.getAllByTestId("date-button");
    fireEvent.click(dateButtons[0]);

    await screen.findByText("17:00");

    const timeButton = screen.getByText("17:00");
    fireEvent.click(timeButton);

    expect(screen.getByText("Continue to Guest Details")).toBeEnabled();
  });

  test("clicking continue calls onContinue with date and time", async () => {
    render(<BookingForm onContinue={mockOnContinue} />);

    const dateButtons = screen.getAllByTestId("date-button");
    fireEvent.click(dateButtons[0]);

    await screen.findByText("17:00");

    const timeButton = screen.getByText("17:00");
    fireEvent.click(timeButton);

    fireEvent.click(screen.getByText("Continue to Guest Details"));

    expect(mockOnContinue).toHaveBeenCalledTimes(1);
    expect(mockOnContinue).toHaveBeenCalledWith({
      date: expect.any(Date),
      time: "17:00",
    });
  });

  test("displays selected date info after clicking date", async () => {
    render(<BookingForm onContinue={mockOnContinue} />);

    const dateButtons = screen.getAllByTestId("date-button");
    fireEvent.click(dateButtons[0]);

    await waitFor(() => {
      expect(screen.getByText(/Selected:/)).toBeInTheDocument();
    });
  });

  test("renders 7 date buttons", () => {
    render(<BookingForm onContinue={mockOnContinue} />);

    const dateButtons = screen.getAllByTestId("date-button");
    expect(dateButtons).toHaveLength(21);
  });
});
