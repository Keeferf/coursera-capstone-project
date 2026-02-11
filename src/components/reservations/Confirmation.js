import "./Confirmation.css";

const Confirmation = ({ reservation, onNewReservation }) => {
  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="confirmation">
      <div className="confirmation-icon">✓</div>
      <h2>Reservation Confirmed</h2>
      <p className="confirmation-message">
        Thank you, {reservation.firstName}! Your table has been reserved.
      </p>

      <div className="confirmation-details">
        <div className="detail-row">
          <span className="detail-label">Date:</span>
          <span className="detail-value">{formatDate(reservation.date)}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Time:</span>
          <span className="detail-value">{reservation.time}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Guests:</span>
          <span className="detail-value">{reservation.guests}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Name:</span>
          <span className="detail-value">
            {reservation.firstName} {reservation.lastName}
          </span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Email:</span>
          <span className="detail-value">{reservation.email}</span>
        </div>
        {reservation.occasion && (
          <div className="detail-row">
            <span className="detail-label">Occasion:</span>
            <span className="detail-value">{reservation.occasion}</span>
          </div>
        )}
      </div>

      <p className="confirmation-note">
        A confirmation email has been sent to {reservation.email}.<br />
      </p>

      <button className="new-reservation-button" onClick={onNewReservation}>
        Make Another Reservation
      </button>
    </div>
  );
};

export default Confirmation;
