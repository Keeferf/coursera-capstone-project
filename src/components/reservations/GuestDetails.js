import React, { useState } from "react";
import "./GuestDetails.css";

const GuestDetails = ({ dateTime, onBack, onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    guests: 2,
    occasion: "",
    requests: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, ...dateTime });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="guest-details">
      <div className="reservation-summary">
        <h3>Reservation Details</h3>
        <p>
          <strong>Date:</strong> {formatDate(dateTime.date)}
        </p>
        <p>
          <strong>Time:</strong> {dateTime.time}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="guest-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="firstName">First Name *</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              minLength="2"
              maxLength="50"
              placeholder="Mark"
              title="First name must be 2-50 characters"
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name *</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              minLength="2"
              maxLength="50"
              placeholder="Zuckerberg"
              title="Last name must be 2-50 characters"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              placeholder="mark@example.com"
              title="Please enter a valid email address"
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              pattern="\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}"
              placeholder="(123) 456-7890"
              title="Please enter a 10-digit phone number (e.g., 123-456-7890)"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="guests">Number of Guests *</label>
            <select
              id="guests"
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              required
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? "Guest" : "Guests"}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="occasion">Occasion (Optional)</label>
            <select
              id="occasion"
              name="occasion"
              value={formData.occasion}
              onChange={handleChange}
            >
              <option value="">Occasion</option>
              <option value="birthday">Birthday</option>
              <option value="anniversary">Engagement</option>
              <option value="business">Anniversary</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="requests">Special Requests (Optional)</label>
          <textarea
            id="requests"
            name="requests"
            value={formData.requests}
            onChange={handleChange}
            rows="3"
            placeholder="Any dietary restrictions or special seating requests?"
            maxLength="500"
          />
        </div>

        <div className="form-buttons">
          <button type="button" className="back-button" onClick={onBack}>
            Back
          </button>
          <button type="submit" className="submit-button">
            Confirm Reservation
          </button>
        </div>
      </form>
    </div>
  );
};

export default GuestDetails;
