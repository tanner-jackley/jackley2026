function RegistryCard({ registry }) {
  return (
    <>
      <div
        className="registry-container"
        onClick={() => window.open(registry.url)}
      >
        <div className="article-container">
          <img src={registry.src} alt={registry.name} className="project-img" />
        </div>
      </div>
    </>
  );
}

export default RegistryCard;
