import React, { memo } from 'react';
import styles from './header.module.css';

const Header = memo(({ onLogout, authService }) => {
  console.log('header');
  return (
    <header className={styles.header}>
      {onLogout && (
        <button className={styles.logout} onClick={onLogout}>
          Logout
        </button>
      )}

      <h1 className={styles.title}>📝 오늘, 기록</h1>
    </header>
  );
});

export default Header;
