import RegistryCard from "../components/RegistryCard.jsx";
import registries from "../data/registries.json";

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
            {registries.map((registry, key) => (
              <RegistryCard key={key} registry={registry} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Registry;
