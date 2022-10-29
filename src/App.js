import { Routes, Route, Link } from "react-router-dom";
import 'bootstrap/scss/bootstrap.scss';

import FacultyFinder from './modules/FacultyFinder/FacultyFinder';
import GradesFinder from './modules/GradesFinder/GradesFinder';
import './assets/global-styles.css';

function App() {
  return (
    <div>
      <div className="container" style={{
        display: 'flex',
        gap: '20px',
        marginBottom: '30px'
      }}>
        <Link to="/">Grades Finder</Link>
        <Link to="/faculty-finder">Faculty Finder</Link>
      </div>
      <div>
        <Routes>
          <Route path="/faculty-finder" element={<FacultyFinder />} />
          <Route path="/" element={<GradesFinder />}>
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
