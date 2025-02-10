import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles['footer-container']}>
        <div className={styles['footer-grid']}>
          <div>
            <h3>About Travlog</h3>
            <p>
              Your ultimate companion for travel planning, blogging, and
              connecting with fellow adventurers.
            </p>
          </div>
          <div>
            <h3>Features</h3>
            <ul>
              <li>Trip Planning</li>
              <li>Travel Blog</li>
              <li>Community</li>
              <li>Resources</li>
            </ul>
          </div>
          <div>
            <h3>Support</h3>
            <ul>
              <li>Help Center</li>
              <li>Contact Us</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
            </ul>
          </div>
          <div>
            <h3>Connect</h3>
            <ul>
              <li>Twitter</li>
              <li>Facebook</li>
              <li>Instagram</li>
              <li>LinkedIn</li>
            </ul>
          </div>
        </div>
        <div className={styles['footer-divider']}>
          <p>&copy; 2025 Travlog. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
