import React, { memo } from 'react';
import styles from './footer.module.css';

const Footer = memo(() => (
  <footer className={styles.footer}>
    <p className={styles.title}>당신의 오늘을 기록하세요.</p>
  </footer>
));

export default Footer;
