import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import FacultyFinder from './modules/FacultyFinder/FacultyFinder';
import './assets/global-styles.css';
import {Sidebar} from './components'
import AboutUs from './modules/AboutUs/AboutUs'

function App() {
  return (
    <BrowserRouter>
      <Sidebar />
      <Routes>
        <Route path="/" element={<FacultyFinder />} />
        <Route path="/about-us" element={<AboutUs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
