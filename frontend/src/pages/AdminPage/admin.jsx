import { Outlet } from 'react-router-dom';
import AdminSidebar from '../../Layouts/admin/adminSidebar';
import './adminLayout.css';

const AdminPage = () => {
  return (
   <div className="container1">
     <div className="admin-layout">
      <AdminSidebar />
      <div className="content">
        <Outlet />
      </div>
      <h1 className='header'>Welcome to admin dashboard</h1>
    </div>
   </div>
  );
};

export default AdminPage;
