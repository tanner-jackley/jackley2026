import "../css/App.css";
import "../css/index.css";

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
              <div id="entireForm">
                <form id="form">
                  <div className="field">
                    <label className="label">Look up your invitation:</label>
                    <div className="control">
                      <input
                        className="input"
                        name="name"
                        type="text"
                        placeholder="Firstname Lastname"
                      />
                    </div>
                    <p className="help">
                      Enter your first and last name exactly as it appears on
                      your invitation. If there is more than one name, enter
                      just one of them.
                    </p>
                  </div>
                  <div className="field is-grouped is-grouped-centered">
                    <div className="control">
                      <button
                        id="submit"
                        className="btn button is-link"
                        type="submit"
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                  <div id="output"></div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default RSVP;
