import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/scss/bootstrap.scss";

import FacultyFinder from "./modules/FacultyFinder/FacultyFinder";
import GradesFinder from "./modules/GradesFinder/GradesFinder";
import "./assets/global-styles.css";
import "./assets/nav.css";
import About from "./modules/About/About";

function App() {
  return (
    <div>
      <div className="nav">
        <Link to="/">Пошук за балами</Link>
        <Link to="/faculty-finder">Пошук за предметами</Link>
        <Link to="/about">Про нас</Link>
      </div>
      <div>
        <Routes>
          <Route path="/faculty-finder" element={<FacultyFinder />} />
          <Route path="/" element={<GradesFinder />}></Route>
          <Route path="/about" element={<About />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
