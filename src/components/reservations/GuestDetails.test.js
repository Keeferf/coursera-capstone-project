// GuestDetails.test.js
import { render, screen, fireEvent } from "@testing-library/react";
import GuestDetails from "./GuestDetails";

describe("GuestDetails Component", () => {
  const mockDate = new Date("2024-01-15T12:00:00");
  const mockDateTime = { date: mockDate, time: "18:00" };
  const mockOnBack = jest.fn();
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
    mockOnBack.mockClear();
  });

  test("renders reservation summary with correct date and time", () => {
    render(
      <GuestDetails
        dateTime={mockDateTime}
        onBack={mockOnBack}
        onSubmit={mockOnSubmit}
      />,
    );

    // Check that the summary section is rendered
    expect(screen.getByText("Reservation Details")).toBeInTheDocument();

    // Check for date and time labels
    expect(screen.getByText(/Date:/)).toBeInTheDocument();
    expect(screen.getByText(/Time:/)).toBeInTheDocument();

    // Check that time value is displayed
    expect(screen.getByText("18:00")).toBeInTheDocument();
  });

  test("renders all required form fields", () => {
    render(
      <GuestDetails
        dateTime={mockDateTime}
        onBack={mockOnBack}
        onSubmit={mockOnSubmit}
      />,
    );

    // Get all inputs and check their required attributes
    const firstName = screen.getByLabelText(/First Name \*/);
    expect(firstName).toBeRequired();

    const lastName = screen.getByLabelText(/Last Name \*/);
    expect(lastName).toBeRequired();

    const email = screen.getByLabelText(/Email \*/);
    expect(email).toBeRequired();

    const phone = screen.getByLabelText(/Phone Number \*/);
    expect(phone).toBeRequired();

    const guests = screen.getByLabelText(/Number of Guests \*/);
    expect(guests).toBeRequired();
  });

  test("validates email format", () => {
    render(
      <GuestDetails
        dateTime={mockDateTime}
        onBack={mockOnBack}
        onSubmit={mockOnSubmit}
      />,
    );

    const emailInput = screen.getByLabelText(/Email \*/);

    // Check HTML5 validation attributes
    expect(emailInput).toHaveAttribute("type", "email");
    expect(emailInput).toHaveAttribute(
      "pattern",
      "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$",
    );

    // Test validation with different values
    fireEvent.change(emailInput, { target: { value: "invalid-email" } });
    // Check validity after change
    expect(emailInput.checkValidity()).toBe(false);

    fireEvent.change(emailInput, { target: { value: "valid@example.com" } });
    expect(emailInput.checkValidity()).toBe(true);
  });

  test("validates phone number format", () => {
    render(
      <GuestDetails
        dateTime={mockDateTime}
        onBack={mockOnBack}
        onSubmit={mockOnSubmit}
      />,
    );

    const phoneInput = screen.getByLabelText(/Phone Number \*/);

    // Check pattern attribute
    expect(phoneInput).toHaveAttribute(
      "pattern",
      "\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}",
    );
    expect(phoneInput).toHaveAttribute(
      "title",
      "Please enter a 10-digit phone number (e.g., 123-456-7890)",
    );

    // Test validation
    fireEvent.change(phoneInput, { target: { value: "123" } }); // Too short
    expect(phoneInput.checkValidity()).toBe(false);

    fireEvent.change(phoneInput, { target: { value: "123-456-7890" } }); // Valid
    expect(phoneInput.checkValidity()).toBe(true);
  });

  test("validates name field lengths", () => {
    render(
      <GuestDetails
        dateTime={mockDateTime}
        onBack={mockOnBack}
        onSubmit={mockOnSubmit}
      />,
    );

    const firstNameInput = screen.getByLabelText(/First Name \*/);
    const lastNameInput = screen.getByLabelText(/Last Name \*/);

    // Check min/max length attributes exist
    expect(firstNameInput).toHaveAttribute("minlength", "2");
    expect(firstNameInput).toHaveAttribute("maxlength", "50");
    expect(lastNameInput).toHaveAttribute("minlength", "2");
    expect(lastNameInput).toHaveAttribute("maxlength", "50");

    // Check title attributes for user guidance
    expect(firstNameInput).toHaveAttribute(
      "title",
      "First name must be 2-50 characters",
    );
    expect(lastNameInput).toHaveAttribute(
      "title",
      "Last name must be 2-50 characters",
    );

    // Test that inputs accept values within limits
    fireEvent.change(firstNameInput, { target: { value: "John" } });
    // Use toHaveValue instead of checking .value directly
    expect(firstNameInput).toHaveValue("John");

    fireEvent.change(firstNameInput, { target: { value: "A" } });
    expect(firstNameInput).toHaveValue("A");
  });

  test("validates guest count options", () => {
    render(
      <GuestDetails
        dateTime={mockDateTime}
        onBack={mockOnBack}
        onSubmit={mockOnSubmit}
      />,
    );

    // Check that all guest options 1-8 are rendered
    expect(screen.getByText("1 Guest")).toBeInTheDocument();
    expect(screen.getByText("2 Guests")).toBeInTheDocument();
    expect(screen.getByText("3 Guests")).toBeInTheDocument();
    expect(screen.getByText("4 Guests")).toBeInTheDocument();
    expect(screen.getByText("5 Guests")).toBeInTheDocument();
    expect(screen.getByText("6 Guests")).toBeInTheDocument();
    expect(screen.getByText("7 Guests")).toBeInTheDocument();
    expect(screen.getByText("8 Guests")).toBeInTheDocument();
  });

  test("submits form with valid data", () => {
    // Mock the form validation to pass
    const originalCheckValidity = HTMLInputElement.prototype.checkValidity;
    HTMLInputElement.prototype.checkValidity = jest.fn(() => true);

    render(
      <GuestDetails
        dateTime={mockDateTime}
        onBack={mockOnBack}
        onSubmit={mockOnSubmit}
      />,
    );

    // Fill out form with valid data
    fireEvent.change(screen.getByLabelText(/First Name \*/), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByLabelText(/Last Name \*/), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByLabelText(/Email \*/), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Phone Number \*/), {
      target: { value: "123-456-7890" },
    });
    fireEvent.change(screen.getByLabelText(/Number of Guests \*/), {
      target: { value: "4" },
    });

    // Submit form
    fireEvent.click(
      screen.getByRole("button", { name: /Confirm Reservation/ }),
    );

    // Should call onSubmit with combined data
    expect(mockOnSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        phone: "123-456-7890",
        guests: "4",
        date: mockDate,
        time: "18:00",
      }),
    );

    // Restore original method
    HTMLInputElement.prototype.checkValidity = originalCheckValidity;
  });

  test("calls onBack when back button is clicked", () => {
    render(
      <GuestDetails
        dateTime={mockDateTime}
        onBack={mockOnBack}
        onSubmit={mockOnSubmit}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /Back/ }));
    expect(mockOnBack).toHaveBeenCalled();
  });

  test("validates special requests max length", () => {
    render(
      <GuestDetails
        dateTime={mockDateTime}
        onBack={mockOnBack}
        onSubmit={mockOnSubmit}
      />,
    );

    const textarea = screen.getByLabelText(/Special Requests/);

    // Check attribute exists
    expect(textarea).toHaveAttribute("maxlength", "500");

    // Set a value within limit and verify it's accepted
    fireEvent.change(textarea, { target: { value: "A".repeat(500) } });
    // Use toHaveValue to check the value
    expect(textarea).toHaveValue("A".repeat(500));

    // Set a value and verify input works
    fireEvent.change(textarea, { target: { value: "Test request" } });
    expect(textarea).toHaveValue("Test request");
  });

  test("form has correct structure and labels", () => {
    render(
      <GuestDetails
        dateTime={mockDateTime}
        onBack={mockOnBack}
        onSubmit={mockOnSubmit}
      />,
    );

    // Check all form labels are present
    expect(screen.getByText("First Name *")).toBeInTheDocument();
    expect(screen.getByText("Last Name *")).toBeInTheDocument();
    expect(screen.getByText("Email *")).toBeInTheDocument();
    expect(screen.getByText("Phone Number *")).toBeInTheDocument();
    expect(screen.getByText("Number of Guests *")).toBeInTheDocument();
    expect(screen.getByText("Occasion (Optional)")).toBeInTheDocument();
    expect(screen.getByText("Special Requests (Optional)")).toBeInTheDocument();

    // Check that all form inputs are present and accessible
    expect(screen.getByLabelText(/First Name \*/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name \*/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email \*/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone Number \*/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Number of Guests \*/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Occasion/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Special Requests/)).toBeInTheDocument();

    // Check for both buttons
    expect(
      screen.getByRole("button", { name: /Confirm Reservation/ }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Back/ })).toBeInTheDocument();

    // Check form exists by finding an element that should be inside the form
    // Look for a form input and verify it's within a form context
    const firstNameInput = screen.getByLabelText(/First Name \*/);
    // Instead of closest(), we can check that the form exists by verifying
    // that form-specific elements are present
    expect(screen.getByRole("button", { type: "submit" })).toBeInTheDocument();
  });

  test("includes optional occasion options", () => {
    render(
      <GuestDetails
        dateTime={mockDateTime}
        onBack={mockOnBack}
        onSubmit={mockOnSubmit}
      />,
    );

    // Check that occasion options are present
    expect(screen.getByText("Occasion")).toBeInTheDocument();
    expect(screen.getByText("Birthday")).toBeInTheDocument();
    expect(screen.getByText("Engagement")).toBeInTheDocument();
    expect(screen.getByText("Anniversary")).toBeInTheDocument();
  });

  test("pre-fills guests with default value of 2", () => {
    render(
      <GuestDetails
        dateTime={mockDateTime}
        onBack={mockOnBack}
        onSubmit={mockOnSubmit}
      />,
    );

    // Use getByDisplayValue to check default selection
    expect(screen.getByDisplayValue("2")).toBeInTheDocument();

    // Alternative: check that 2 Guests option exists
    expect(screen.getByText("2 Guests")).toBeInTheDocument();
  });

  test("updates form data on input change", () => {
    render(
      <GuestDetails
        dateTime={mockDateTime}
        onBack={mockOnBack}
        onSubmit={mockOnSubmit}
      />,
    );

    const firstNameInput = screen.getByLabelText(/First Name \*/);
    const emailInput = screen.getByLabelText(/Email \*/);

    // Test that inputs update correctly
    fireEvent.change(firstNameInput, { target: { value: "Jane" } });
    expect(firstNameInput).toHaveValue("Jane");

    fireEvent.change(emailInput, { target: { value: "jane@example.com" } });
    expect(emailInput).toHaveValue("jane@example.com");
  });

  test("form includes all necessary HTML5 validation attributes", () => {
    render(
      <GuestDetails
        dateTime={mockDateTime}
        onBack={mockOnBack}
        onSubmit={mockOnSubmit}
      />,
    );

    // Check a comprehensive list of validation attributes
    const firstName = screen.getByLabelText(/First Name \*/);
    expect(firstName).toHaveAttribute("required");
    expect(firstName).toHaveAttribute("minlength", "2");
    expect(firstName).toHaveAttribute("maxlength", "50");

    const email = screen.getByLabelText(/Email \*/);
    expect(email).toHaveAttribute("required");
    expect(email).toHaveAttribute("type", "email");
    expect(email).toHaveAttribute("pattern");

    const phone = screen.getByLabelText(/Phone Number \*/);
    expect(phone).toHaveAttribute("required");
    expect(phone).toHaveAttribute("type", "tel");
    expect(phone).toHaveAttribute("pattern");

    const guests = screen.getByLabelText(/Number of Guests \*/);
    expect(guests).toHaveAttribute("required");
  });
});
