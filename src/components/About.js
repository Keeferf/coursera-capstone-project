import maa1 from "../assets/Mario and Adrian A.jpg";
import maa2 from "../assets/Mario and Adrian b.jpg";
import "./About.css";

const About = () => {
  return (
    <section className="about">
      <div className="about-container">
        <div className="about-content">
          <h2 className="about-title">Little Lemon</h2>
          <h3 className="about-subtitle">Physical Location</h3>
          <p className="about-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris.
          </p>
          <p className="about-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris.
          </p>
        </div>
        <div className="about-images">
          <img
            src={maa1}
            alt="Little Lemon chefs in the kitchen 1"
            className="about-image about-image-front"
            loading="lazy"
          />
          <img
            src={maa2}
            alt="Little Lemon chefs in the kitchen 2"
            className="about-image about-image-back"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
