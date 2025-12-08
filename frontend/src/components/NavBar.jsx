import { Link } from "react-router-dom";
import { useState } from "react";
import navigation from "../data/navigation.json";
import Navigation from "./Navigation.jsx";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <nav id="desktop-nav" className="header-nav">
        <div className="logo">
          <Link to="/" onClick={scrollToTop}>
            Lucy & Tanner
          </Link>
        </div>
        <div>
          <ul className="nav-links">
            <Navigation toggle={toggle} />
          </ul>
        </div>
      </nav>
      <nav
        id="hamburger-nav"
        className={`ham-header-nav${isOpen ? " open" : ""}`}
      >
        <div className="top-row">
          <div className="logo">
            <Link to="/" onClick={scrollToTop}>
              L & T
            </Link>
          </div>
          <div className="hamburger-menu">
            <div
              className={`hamburger-icon${isOpen ? " open" : ""}`}
              onClick={toggle}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
        <ul className="hamburger-nav-links">
          <Navigation toggle={toggle} />
        </ul>
      </nav>
    </>
  );
}

export default NavBar;
