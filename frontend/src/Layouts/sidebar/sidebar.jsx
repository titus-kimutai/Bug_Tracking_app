import { Link } from 'react-router-dom';
import './style.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Dashboard</h2>
      <ul>
        <li><Link to="/home/projects">Projects</Link></li>
        <li><Link to="/home/issues">Tickets</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
