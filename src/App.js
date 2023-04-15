import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/scss/bootstrap.scss";

import FacultyFinder from "./modules/FacultyFinder/FacultyFinder";
import GradesFinder from "./modules/GradesFinder/GradesFinder";
import "./assets/global-styles.css";
import "./assets/nav.css";
import About from "./modules/About/About";
import Faq from "./modules/FAQ/Faq";

function App() {
  return (
    <div>
      <div className="nav">
        <Link to="/">Пошук за балами</Link>
        <Link to="/faculty-finder">Пошук за предметами</Link>
        <Link to="/about">Про нас</Link>
        <Link to="/faq">FAQ</Link>
      </div>
      <div>
        <Routes>
          <Route path="/faculty-finder" element={<FacultyFinder />} />
          <Route path="/about" element={<About />}></Route>
          <Route path="/faq" element={<Faq />}></Route>
          <Route path="/" element={<GradesFinder />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
