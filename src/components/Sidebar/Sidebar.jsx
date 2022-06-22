import {Link} from 'react-router-dom'
import "./style.css";

export function Sidebar(){
  return (
  <div id="sidebar">
    <div id="sidebar-wrapper">
      <ul className="sidebar-nav">
        <div className={"header"}>
          <h1>JobHelper</h1>
        </div>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/about-us'>About-us</Link>
        </li>
      </ul>
    </div>
  </div>
  );
}
