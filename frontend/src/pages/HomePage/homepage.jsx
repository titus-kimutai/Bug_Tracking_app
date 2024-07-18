import { Outlet } from 'react-router-dom';
import './home.css';
import Navbar from '../../Layouts/navbar/navbar';
import Sidebar from '../../Layouts/sidebar/sidebar';

const HomePage = () => {
  return (
    <div className="homepage">
      <Navbar />
      <div className="main">
        <Sidebar />
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
