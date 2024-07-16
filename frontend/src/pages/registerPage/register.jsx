import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, reset } from '../../features/auth/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { styles } from './styles';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('client');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isSuccess) {
      navigate('/');
    }

    if (isError) {
      alert(message);
    }

    dispatch(reset());
  }, [isSuccess, isError, message, navigate, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    dispatch(registerUser({ username, email, password, role }));
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Register</h2>
      <form style={styles.form} onSubmit={handleSubmit}>
        <label style={styles.label} htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          style={styles.input}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label style={styles.label} htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          style={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label style={styles.label} htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          style={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label style={styles.label} htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          style={styles.input}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <label style={styles.label} htmlFor="role">Role:</label>
        <select
          id="role"
          name="role"
          style={styles.input}
          value={role}  
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="admin">Admin</option>
          <option value="developer">Developer</option>
          <option value="client">manager</option>
        </select>

        <button type="submit" style={styles.button}>
          {isLoading ? 'Loading...' : 'Register'}
        </button>

        <p style={styles.registerPrompt}>
          Already have an account? <Link to="/" style={styles.link}>Login</Link>
        </p>
      </form>
    </div>
  );
};
export default RegisterPage;
