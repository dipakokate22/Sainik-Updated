import styles from './signup.module.css';

const SignupPage = () => {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.signupForm}>
        <button className={`${styles.btn} ${styles.btnSignupTop}`}>
          Sign Up
        </button>
        <p className={styles.loginText}>
          Already have an account? <span>Log In</span>
        </p>

        {/* Wrapper for main form content to enforce width */}
        <div className={styles.formContent}>
          <div className={styles.formGrid}>
            <div className={styles.inputGroup}>
              <label htmlFor="name" className={styles.label}>Name</label>
              <input type="text" id="name" className={styles.input} />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.label}>Email</label>
              <input type="email" id="email" className={styles.input} />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password" className={styles.label}>Password</label>
              <input type="password" id="password" className={styles.input} />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="re-password" className={styles.label}>Re-enter Password</label>
              <input type="password" id="re-password" className={styles.input} />
            </div>
          </div>

          <div className={styles.checkboxContainer}>
            <input type="checkbox" id="terms" className={styles.checkbox} />
            <label htmlFor="terms" className={styles.checkboxLabel}>
              Accept the Terms and Privacy Policy
            </label>
          </div>

          <button className={`${styles.btn} ${styles.btnRegister}`}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;