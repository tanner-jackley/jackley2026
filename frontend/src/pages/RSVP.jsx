import RSVPForm from "../components/RSVPForm.jsx";

function RSVP() {
  return (
    <>
      <section id="rsvp">
        <div className="title-container">
          <h1 className="story-title">RSVP</h1>
          <p>Let us know if you can make it!</p>
        </div>
        <div className="container">
          <div className="columns is-centered">
            <div className="column rsvp-background">
              <RSVPForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default RSVP;
