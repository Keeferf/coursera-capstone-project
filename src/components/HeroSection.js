import "./HeroSection.css";

const HeroSection = ({
  title,
  subtitle,
  description,
  buttonText,
  onButtonClick,
  showImage = false,
  imageSrc,
  imageAlt,
}) => {
  const isCentered = !showImage && !description && !buttonText;

  return (
    <section className="hero-section">
      <div className={`hero-section-inner ${isCentered ? "centered" : ""}`}>
        <div className="hero-section-content">
          <h1>{title}</h1>
          {subtitle && <h2>{subtitle}</h2>}
          {description && <p className="hero-description">{description}</p>}
          {buttonText && onButtonClick && (
            <button className="hero-button" onClick={onButtonClick}>
              {buttonText}
            </button>
          )}
        </div>
        {showImage && imageSrc && (
          <div className="hero-section-image">
            <img src={imageSrc} alt={imageAlt} loading="eager" />
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
