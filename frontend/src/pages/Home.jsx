import "../css/App.css";
import "../css/bulma.css";
import "../css/index.css";

function Home() {
  return (
    <>
      <section id="main">
        <img
          src="/src/assets/T99A7629.jpg"
          alt="Lucy and Tanner Engagement"
          className="hero-image"
        />
        <div className="hero-overlay">
          <div className="hero-text-container">
            <h1 className="hero-title">the jackleys</h1>
            <p className="hero-subtitle">05.30.2026</p>
          </div>
        </div>
      </section>
      <section id="details">
        <div className="details-container">
          <div className="details-background">
            <h1>Wedding Details</h1>
            <p>Saturday, May 30, 2026</p>
            <p>2:00 PM</p>
            <p>4500 Little Blue Pkwy, Independence, MO 64057</p>
            <button
              className="btn"
              onClick={() => (window.location.href = "/rsvp")}
            >
              RSVP
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
