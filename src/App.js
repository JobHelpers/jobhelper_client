import { Routes, Route, Link, NavLink } from "react-router-dom";
import "bootstrap/scss/bootstrap.scss";
import FacultyFinder from "./modules/FacultyFinder/FacultyFinder";
import GradesFinder from "./modules/GradesFinder/GradesFinder";
import "./assets/global-styles.css";
import "./assets/nav.css";
import About from "./modules/About/About";
import Faq from "./modules/FAQ/Faq";
import navLinks from "./components/nav/nav_handler";
import SignUpForm from "./modules/SignUpForm/SignUpForm";
import LogInForm from "./modules/LogInForm/LogInForm";

function App() {
  return (
    <div>
      <div className="nav">
        {navLinks.map(({name, href, marginLeft, backgroundColor}) => {
          return <NavLink key={name} to={href} className={({isActive}) => {if (isActive) return "active"}} style={{marginLeft: marginLeft || 20, backgroundColor: backgroundColor || null}}>{name}</NavLink>
        })}
      </div>

      <div>
        <Routes>
          <Route path="/faculty-finder" element={<FacultyFinder />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/" element={<GradesFinder />} />
          <Route path="/sign-up" element={<SignUpForm />} />
          <Route path="/log-in" element={<LogInForm />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
