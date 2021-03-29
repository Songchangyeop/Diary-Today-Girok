import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../footer/footer';
import Header from '../header/header';
import styles from './login.module.css';

const Login = ({ authService }) => {
  const history = useHistory();

  const goToMaker = (userId) => {
    history.push({
      pathname: '/maker',
      state: { id: userId },
    });
  };

  const onLogin = (event) => {
    authService
      .login(event.target.value) //
      .then((data) => goToMaker(data.user.uid));
  };

  useEffect(() => {
    authService.onAuthChange((user) => {
      user && goToMaker(user.uid);
    });
  });

  return (
    <section className={styles.login}>
      <Header authService={authService} />
      <section>
        <h1>로그인</h1>
        <ul className={styles.list}>
          <li className={styles.item}>
            <button className={styles.button} onClick={onLogin} value="Google">
              <img
                className={styles.logo}
                src="images/google.png"
                alt="google"
              />
              Google을(를) 사용하여 로그인
            </button>
          </li>
          <li className={styles.item}>
            <button className={styles.button} onClick={onLogin} value="Github">
              <img
                className={styles.logo}
                src="images/github.png"
                alt="github"
              />
              Github을(를) 사용하여 로그인
            </button>
          </li>
          <li className={styles.item}>
            <button
              className={styles.button}
              onClick={onLogin}
              value="Facebook"
            >
              <img
                className={styles.logo}
                src="images/facebook.png"
                alt="facebook"
              />
              Facebook을(를) 사용하여 로그인
            </button>
          </li>
        </ul>
      </section>
      <Footer />
    </section>
  );
};

export default Login;
