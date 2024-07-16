import { Link } from 'react-router-dom';
import { FaHome, FaSignOutAlt } from 'react-icons/fa';

// eslint-disable-next-line react/prop-types
const Navbar = ({ isLoggedIn }) => {
  const handleLogout = () => {
    // my logout logic will be handled here
    console.log("User logged out");
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        <Link to="/home" style={styles.iconLink}>
          <FaHome style={styles.icon} />
        </Link>
               <div style={styles.authContainer}>
          {isLoggedIn ? (
            <button onClick={handleLogout} style={styles.logoutButton}>
              <FaSignOutAlt style={styles.icon} /> Logout
            </button>
          ) : (
            <Link to="/register" style={styles.link}>
              Sign Up
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#007BFF',
    padding: '20px',
    position: 'fixed',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    maxWidth: '1000px',
  },
  iconLink: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '1.5rem',
  },
  icon: {
    marginRight: '10px',
  },
  middleContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '1.2rem',
    margin: '0 15px',
  },
  authContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  logoutButton: {
    background: 'none',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '1.2rem',
  },
};

export default Navbar;
