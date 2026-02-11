// src/components/DateTimeSelection.js
import React, { useState, useEffect } from "react";
import { fetchAPI } from "../../api";
import "./DateTimeSelection.css";

const DateTimeSelection = ({ onContinue }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 21; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const dates = generateDates();

  useEffect(() => {
    if (selectedDate) {
      setIsLoading(true);
      const times = fetchAPI(selectedDate);
      setAvailableTimes(times);
      setSelectedTime(null);
      setIsLoading(false);
    }
  }, [selectedDate]);

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const handleContinue = () => {
    if (selectedDate && selectedTime) {
      onContinue({ date: selectedDate, time: selectedTime });
    }
  };

  return (
    <div className="datetime-selection">
      {/* Select Date Section */}
      <div className="selection-section">
        <h3>Select Date</h3>
        <div className="calendar-grid">
          {dates.map((date, index) => (
            <button
              key={index}
              data-testid="date-button"
              className={`date-button ${selectedDate?.toDateString() === date.toDateString() ? "selected" : ""}`}
              onClick={() => setSelectedDate(date)}
            >
              <span className="date-day">{date.getDate()}</span>
              <span className="date-weekday">
                {date.toLocaleDateString("en-US", { weekday: "short" })}
              </span>
              <span className="date-month">
                {date.toLocaleDateString("en-US", { month: "short" })}
              </span>
            </button>
          ))}
        </div>
        {selectedDate && (
          <div className="selected-info">
            Selected: {formatDate(selectedDate)}
          </div>
        )}
      </div>

      {/* Select Time Section */}
      <div className="selection-section">
        <h3>Select Time</h3>
        {isLoading ? (
          <p className="loading-text">Loading available times...</p>
        ) : availableTimes.length > 0 ? (
          <div className="time-grid">
            {availableTimes.map((time) => (
              <button
                key={time}
                data-testid="time-button"
                className={`time-button ${selectedTime === time ? "selected" : ""}`}
                onClick={() => setSelectedTime(time)}
              >
                {time}
              </button>
            ))}
          </div>
        ) : selectedDate ? (
          <p className="no-times">No available times for this date.</p>
        ) : (
          <p className="select-date-prompt">Please select a date first.</p>
        )}
      </div>

      {/* Continue Button */}
      <button
        data-testid="continue-button"
        className="continue-button"
        onClick={handleContinue}
        disabled={!selectedDate || !selectedTime}
      >
        Continue to Guest Details
      </button>
    </div>
  );
};

export default DateTimeSelection;
