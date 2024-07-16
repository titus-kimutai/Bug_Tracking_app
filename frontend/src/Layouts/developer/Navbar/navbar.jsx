import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchUser, logout } from '../../../features/auth/authSlice';
import '../styles/navbar.css';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { user, token } = useSelector((state) => state.auth);


  useEffect(() => {
    if (token && !user) {
      dispatch(fetchUser());
    }
  }, [dispatch, token, user]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/')
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/developer" className="navbar-link">Home</Link>
      </div>
      <div className="navbar-center">
        <Link to="/developer/Projects" className="navbar-link">Projects</Link>
        <Link to="/developer/Ticket" className="navbar-link">Tickets</Link>
        <Link to="/developer/profile" className="navbar-link">Profile</Link>
      </div>
      <div className="navbar-right">
        {user ? (
          <button onClick={handleLogout} className="navbar-link">Logout</button>
        ) : (
          <Link to="/" className="navbar-link">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
