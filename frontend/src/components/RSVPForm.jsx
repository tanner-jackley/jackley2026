import { useState, useEffect } from "react";

export default function RSVPForm() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [guests, setGuests] = useState([]);
  const [inviteID, setInviteID] = useState("");
  const [rsvpSuccess, setRsvpSuccess] = useState(false);

  // Lookup guest by name
  const handleLookup = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setMessage("Please enter a name.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(
        `https://script.google.com/macros/s/AKfycbxoiwZddys4-bgjn2e8E84KYGbT3fOP8NsgOYQz2j1W8goktqyCkbpMocba5sDngkLjcA/exec?name=${encodeURIComponent(
          name
        )}`
      );
      const text = await res.text();

      if (text === "Name not found") {
        setMessage("Couldn't find guest name. Please check spelling.");
      } else if (text === "Already RSVPd") {
        setMessage("This guest has already submitted an RSVP.");
      } else if (text === "Empty") {
        setMessage("Please enter a name.");
      } else {
        const namesArray = text.split(",");
        const id = namesArray.shift() || "NA";
        setInviteID(id);
        const guestList = namesArray.map((n, i) => ({
          name: n,
          attending: false,
          id: `person${i}`,
        }));
        setGuests(guestList);
      }
    } catch (err) {
      console.error(err);
      setMessage("Error fetching data. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Toggle checkbox
  const toggleGuest = (index) => {
    setGuests((prev) =>
      prev.map((g, i) => (i === index ? { ...g, attending: !g.attending } : g))
    );
  };

  // Submit RSVP
  const handleSubmit = async () => {
    const dataToSend = guests.map((g) => ({
      inviteID,
      name: g.name,
      attending: g.attending ? 1 : 0,
    }));

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(
        "https://script.google.com/macros/s/AKfycbxoiwZddys4-bgjn2e8E84KYGbT3fOP8NsgOYQz2j1W8goktqyCkbpMocba5sDngkLjcA/exec",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: JSON.stringify(dataToSend),
        }
      );

      const response = await res.json();

      if (response.success) {
        setRsvpSuccess(true);
        setMessage("RSVP Received! ✓");
        setGuests([]);

        if (window.addeventatc) {
          addeventatc.refresh();
        }
      } else {
        setMessage("There was a problem recording your RSVP.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Network error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Load AddEvent script dynamically after RSVP success
  useEffect(() => {
    if (rsvpSuccess && !document.getElementById("addevent-script")) {
      const script = document.createElement("script");
      script.src = "https://addevent.com/libs/atc/1.6.1/atc.min.js";
      script.id = "addevent-script";
      script.async = true;
      document.body.appendChild(script);
    }
  }, [rsvpSuccess]);

  return (
    <div id="entireForm">
      {!guests.length && !rsvpSuccess ? (
        <form id="form" onSubmit={handleLookup}>
          <div className="field">
            <label className="label">Look up your invitation:</label>
            <div className="control">
              <input
                className="input"
                name="name"
                type="text"
                placeholder="Firstname Lastname"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <p className="help">
              Enter your first and last name exactly as it appears on your
              invitation. If there is more than one name, enter just one of
              them.
            </p>
          </div>
          <div className="field is-grouped is-grouped-centered">
            <div className="control">
              <button
                id="submit"
                className="btn button is-link"
                type="submit"
                disabled={loading}
              >
                {loading ? "Loading..." : "Continue"}
              </button>
            </div>
          </div>
          {message && (
            <div id="output" className="notification is-danger">
              {message}
            </div>
          )}
        </form>
      ) : rsvpSuccess ? (
        <div className="rsvp-success">
          <p className="notification is-success">{message}</p>

          {/* AddEvent Button */}
          <div className="addeventatc" title="Add to Calendar">
            Add to Calendar
            <span className="start">05/30/2026 02:00 PM</span>
            <span className="end">05/30/2026 07:00 PM</span>
            <span className="timezone">America/Chicago</span>
            <span className="title">Lucy and Tanner's Wedding</span>
            <span className="description">
              Join us for a beautiful wedding celebration!
            </span>
            <span className="location">
              4500 Little Blue Pkwy, Independence, MO 64057
            </span>
          </div>
        </div>
      ) : (
        <div className="guest-list">
          <p className="label" style={{ color: "var(--dark-color)" }}>
            We found your RSVP! (If you cannot attend, leave unchecked and
            submit)
          </p>
          {guests.map((g, i) => (
            <div className="card mb-4" key={g.id}>
              <div className="card-content">
                <p className="subtitle">{g.name}</p>
                <div className="field">
                  <label className="checkbox">
                    <input
                      type="checkbox"
                      checked={g.attending}
                      onChange={() => toggleGuest(i)}
                    />
                    <span className="ml-2">Attending?</span>
                  </label>
                </div>
              </div>
            </div>
          ))}
          <div className="field">
            <div className="control has-text-centered">
              <button
                id="submit"
                className="button is-link"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
          {message && <div className="notification is-danger">{message}</div>}
        </div>
      )}
    </div>
  );
}
