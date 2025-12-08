import { Link } from "react-router-dom";
import navigation from "../data/navigation.json";

function Navigation({ toggle }) {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const toggleAndScroll = () => {
    toggle();
    scrollToTop();
    console.log("Toggled menu and scrolled to top.");
  };

  return (
    <>
      {navigation.map((nav) => (
        <li key={nav.name}>
          <Link to={nav.path} onClick={toggleAndScroll}>
            {nav.name}
          </Link>
        </li>
      ))}
    </>
  );
}

export default Navigation;
