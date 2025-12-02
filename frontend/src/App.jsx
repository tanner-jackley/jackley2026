import { useState } from "react";
import "./css/App.css";
import "./css/bulma.css";
import "./css/index.css";
import NavBar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Story from "./pages/Story.jsx";
import Gallery from "./pages/Gallery.jsx";
import Registry from "./pages/Registry.jsx";
import RSVP from "./pages/RSVP.jsx";

function App() {
  return (
    <>
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/story" element={<Story />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/registry" element={<Registry />} />
          <Route path="/rsvp" element={<RSVP />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
