// Redirector.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Redirector = () => {
  const { role, token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      switch (role) {
        case 'admin':
          navigate('/admin');
          break;
        case 'manager':
          navigate('/home');
          break;
        case 'developer':
          navigate('/developer');
          break;
        default:
          navigate('/');
      }
    } else {
      navigate('/');
    }
  }, [role, token, navigate]);

  return null;
};

export default Redirector;
