import { Link } from "react-router-dom";
import "../css/App.css";
import "../css/bulma.css";
import "../css/index.css";
import { Countdown } from "../utils/countDown.js";
import { useEffect } from "react";

function initializeCountdown() {
  console.log("Running countdown init...");

  const targetDate = new Date(2026, 4, 30, 14, 0, 0);
  console.log("Target date:", targetDate);

  const container = document.querySelector(".countDown-container");
  console.log("Container:", container);

  if (!window.Countdown) {
    console.error("Countdown class is not defined!");
  } else {
    const cd = new Countdown({
      cont: document.querySelector(".countDown-container"),
      countdown: true,
      date: {
        year: 2026,
        month: 5, // May (1-based month)
        day: 30,
        hour: 14, // 2 PM
        minute: 0,
        second: 0,
      },
      endCallback: () => {
        console.log("Countdown finished!");
      },
      outputFormat: "month|day|hour|minute",
    });
    cd.start();
    console.log("Countdown started.");
  }
}

function Footer() {
  useEffect(() => {
    initializeCountdown();
  }, []);

  return (
    <footer>
      <div className="countDown-container"></div>
      <nav className="footer-nav">
        <div className="nav-links-container">
          <ul className="nav-links">
            <li>
              <Link to="/story">Our Story</Link>
            </li>
            <li>
              <Link to="/gallery">Gallery</Link>
            </li>
            <li>
              <Link to="/registry">Registry</Link>
            </li>
            <li>
              <Link to="/rsvp">RSVP</Link>
            </li>
          </ul>
        </div>
      </nav>
      <p>Copyright &#169; 2025 Tanner Jackley. All Rights Reserved.</p>
    </footer>
  );
}

export default Footer;
