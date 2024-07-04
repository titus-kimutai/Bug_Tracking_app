import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Login</h2>
      <form style={styles.form}>
        <label style={styles.label} htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" style={styles.input} />

        <label style={styles.label} htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" style={styles.input} />

        <button type="submit" style={styles.button}>Login</button>

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

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
    padding: '20px',
  },
  title: {
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
  },
  label: {
    marginBottom: '10px',
  },
  input: {
    marginBottom: '15px',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#007BFF',
    color: '#fff',
    cursor: 'pointer',
  },
  rememberMeContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px',
  },
  rememberMeLabel: {
    marginLeft: '5px',
  },
  registerPrompt: {
    marginTop: '10px',
  },
  link: {
    color: '#007BFF',
    textDecoration: 'none',
  },
};

export default LoginPage;
