import "../css/App.css";
import "../css/bulma.css";
import "../css/index.css";

function Registry() {
  return (
    <>
      <section id="registry">
        <div className="title-container">
          <h1 className="story-title">Wedding Registries</h1>
          <p>We are so thankful for you!</p>
        </div>
        <div className="experience-details-container">
          <div className="about-containers">
            <div
              className="registry-container"
              onclick="window.open('https://www.target.com/gift-registry/gift/thejackleys')"
            >
              <div className="article-container">
                <img
                  src="src/assets/target-logo.png"
                  alt="Target Logo"
                  className="project-img"
                />
              </div>
            </div>
            <div
              className="registry-container"
              onclick="window.open('https://www.crateandbarrel.com/gift-registry/lucy-sprink/r7398632')"
            >
              <div className="article-container">
                <img
                  src="src/assets/Crate-Barrel-Logo.png"
                  alt="Crate & Barrel Logo"
                  className="project-img"
                />
              </div>
            </div>
            <div
              className="registry-container"
              onclick="window.open('https://www.amazon.com/wedding/share/thejackleys2026')"
            >
              <div className="article-container">
                <img
                  src="src/assets/Amazon-Logo.png"
                  alt="Amazon Logo"
                  className="project-img"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Registry;
