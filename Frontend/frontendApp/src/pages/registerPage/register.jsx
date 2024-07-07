import { Link } from "react-router-dom";
const RegisterPage = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Register</h2>

      <form style={styles.form}>
      <label style={styles.label} htmlFor="username">Username:</label>
      <input type="text" id="username" name="username" style={styles.input} />

        <label style={styles.label} htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" style={styles.input} />

        <label style={styles.label} htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" style={styles.input} />

        <label style={styles.label} htmlFor="confirmPassword">Confirm Password:</label>
        <input type="password" id="confirmPassword" name="confirmPassword" style={styles.input} />

        <button type="submit" style={styles.button}>Register</button>

        <p style={styles.registerPrompt}>
          Already have an account? <Link to="/" style={styles.link}>Login</Link>
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
};

export default RegisterPage;
