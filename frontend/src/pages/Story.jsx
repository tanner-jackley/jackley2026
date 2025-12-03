import "../css/App.css";
import "../css/bulma.css";
import "../css/index.css";
import StoryCard from "../components/StoryCard.jsx";
import stories from "../data/stories.json";

function Story() {
  return (
    <>
      <section id="story">
        <div className="title-container">
          <h1 className="story-title">Our Story</h1>
        </div>
        <div className="timeline">
          {stories.map((story, index) => (
            <StoryCard key={index} story={story} />
          ))}
        </div>
      </section>
    </>
  );
}

export default Story;
