import { Link } from "react-router-dom";
import "../css/App.css";
import "../css/bulma.css";
import "../css/index.css";

function toggleMenu() {
  const icon = document.querySelector(".hamburger-icon");
  const nav = document.querySelector("#hamburger-nav");
  icon.classList.toggle("open");
  nav.classList.toggle("open");
}

function NavBar() {
  return (
    <>
      <nav id="desktop-nav" className="header-nav">
        <div className="logo">
          <Link to="/">Lucy & Tanner</Link>
        </div>
        <div>
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
      <nav id="hamburger-nav" className="ham-header-nav">
        <div className="top-row">
          <div className="logo">
            <Link to="/">L & T</Link>
          </div>
          <div className="hamburger-menu">
            <div className="hamburger-icon" onClick={toggleMenu}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
        <ul className="hamburger-nav-links">
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
      </nav>
    </>
  );
}

export default NavBar;
