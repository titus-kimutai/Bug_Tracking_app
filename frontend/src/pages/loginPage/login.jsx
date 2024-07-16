import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, reset } from '../../features/auth/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { styles } from './styles';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token, role, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isSuccess || user) {
      if (role) {
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
    }

    if (isError) {
      alert(message);
    }

    dispatch(reset());
  }, [user, token, role, isSuccess, isError, message, navigate, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Login</h2>
      <form style={styles.form} onSubmit={handleSubmit}>
        <label style={styles.label} htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          style={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />

        <label style={styles.label} htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          style={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password" 
        />

        <button type="submit" style={styles.button}>
          {isLoading ? 'Loading...' : 'Login'}
        </button>

        <div style={styles.rememberMeContainer}>
          <input type="checkbox" id="rememberMe" name="rememberMe" />
          <label htmlFor="rememberMe" style={styles.rememberMeLabel}>Remember Me</label>
        </div>

        <p style={styles.registerPrompt}>
          I dont have an account? <Link to="/register" style={styles.link}>Register</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
