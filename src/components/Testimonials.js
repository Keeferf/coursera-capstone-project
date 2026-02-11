import "./Testimonials.css";

const Testimonials = () => {
  const reviews = [
    {
      id: 1,
      name: "Lorem ipsum",
      rating: 5,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 2,
      name: "Lorem ipsum",
      rating: 5,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 3,
      name: "Lorem ipsum",
      rating: 5,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 4,
      name: "Lorem ipsum",
      rating: 5,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ];

  return (
    <section className="testimonials">
      <h2>Testimonials</h2>
      <div className="testimonials-grid">
        {reviews.map((review) => (
          <article key={review.id} className="testimonial-card">
            <div className="testimonial-rating">
              {Array(review.rating).fill("★").join("")}
            </div>
            <div className="testimonial-author">
              <div className="testimonial-avatar">{review.name.charAt(0)}</div>
              <span className="testimonial-name">{review.name}</span>
            </div>
            <p className="testimonial-text">"{review.text}"</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
