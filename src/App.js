import { Routes, Route, Link } from "react-router-dom";

import FacultyFinder from "./modules/FacultyFinder/FacultyFinder";
import GradesFinder from "./modules/GradesFinder/GradesFinder";

import "bootstrap/scss/bootstrap.scss";
import "./assets/styles.css";

function App() {
  return (
    <div>
      <div className="container">
        <ul>
          <li>
            <Link to="/">Grades Finder</Link>
          </li>
          <li>
            <Link to="/faculty-finder">Faculty Finder</Link>
          </li>
          <li>
            <Link to="#about">About Us</Link>
          </li>
        </ul>
      </div>
      <div>
        <Routes>
          <Route path="/faculty-finder" element={<FacultyFinder />} />
          <Route path="/" element={<GradesFinder />} />
          <Route path="#about" />
        </Routes>
      </div>
    </div>
  );
}

export default App;
