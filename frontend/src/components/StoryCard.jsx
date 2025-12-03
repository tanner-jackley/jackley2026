function StoryCard({ story }) {
  return (
    <>
      <div className={`timeline-container ${story.position}`}>
        <div className="timeline-content">
          {story.video ? (
            <video width="480" height="720" controls>
              <source src={story.src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img src={story.src} alt={story.date} className="story-img" />
          )}
          <h2>{story.date}</h2>
          <p>{story.description}</p>
        </div>
      </div>
    </>
  );
}

export default StoryCard;
