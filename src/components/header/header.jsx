import React, { memo } from 'react';
import styles from './header.module.css';

const Header = memo(({ onLogout, authService }) => {
  const reload = () => {
    window.location.reload();
  };
  return (
    <header className={styles.header}>
      {onLogout && (
        <button className={styles.logout} onClick={onLogout}>
          Logout
        </button>
      )}

      <h1 className={styles.title} onClick={reload}>
        📝 오늘, 기록
      </h1>
    </header>
  );
});

export default Header;
