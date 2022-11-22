import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/scss/bootstrap.scss";

import FacultyFinder from "./modules/FacultyFinder/FacultyFinder";
import GradesFinder from "./modules/GradesFinder/GradesFinder";
import "./assets/global-styles.css";
import "./assets/nav.css";

function App() {
  return (
    <div>
      <div className="nav">
        <Link to="/">Знайти спеціальність</Link>
        <Link to="/faculty-finder">Знайти університет</Link>
        <Link to="#about">Про нас</Link>
      </div>
      <div>
        <Routes>
          <Route path="/faculty-finder" element={<FacultyFinder />} />
          <Route path="/" element={<GradesFinder />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
