import { Link } from 'react-router-dom';
import './sidebar.css'; 
import CustomButton from '../../common/buttons/customButton';

const AdminSidebar = () => {
  return (
    <div className="sidebar">
      <h2>Admin Dashboard</h2>
      <ul>
        <li><Link to="/admin/projects">Projects</Link></li>
        <li><Link to="/admin/issues">Tickets</Link></li>
      </ul>
      <CustomButton>Logout</CustomButton>
    </div>
  );
};

export default AdminSidebar;
