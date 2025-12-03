import "../css/App.css";
import "../css/bulma.css";
import "../css/index.css";

const images = import.meta.glob("/src/assets/gallery/*.jpg", { eager: true });

function Gallery() {
  return (
    <>
      <section id="gallery">
        <div className="title-container">
          <h1>Engagement Photo Gallery</h1>
          <p>Photography by Ruth Loftis</p>
        </div>
        <div className="gallery">
          {Object.values(images).map((img, i) => (
            <img key={i} src={img.default} alt={`gallery-${i}`} />
          ))}
        </div>
      </section>
    </>
  );
}

export default Gallery;
