import styles from './login.module.css';

const LoginPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.loginForm}>
        <button className={`${styles.btn} ${styles.btnLoginTop}`}>Login</button>
        <p className={styles.signupText}>
          Dont have an account yet? <span>Sign up</span>
        </p>

        <div className={styles.inputGroup}>
          <label htmlFor="username" className={styles.label}>Username or Email</label>
          <input type="text" id="username" className={styles.input} placeholder="Enter username or email" />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="password" className={styles.label}>Password</label>
          <input type="password" id="password" className={styles.input} placeholder="Enter Password" />
        </div>

        <button className={`${styles.btn} ${styles.btnLogin}`}>Login</button>
        <button className={`${styles.btn} ${styles.btnSignup}`}>Sign Up</button>

        <div className={styles.orSeparator}>
          <hr className={styles.hrLine} />
          <span className={styles.orText}>OR</span>
          <hr className={styles.hrLine} />
        </div>

        <div className={styles.socialLogin}>
          <button className={`${styles.btn} ${styles.btnFacebook}`}>Facebook</button>
          <button className={`${styles.btn} ${styles.btnGoogle}`}>Google</button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;