import React, { useEffect, useState } from 'react';
import styles from './maker.module.css';
import Header from '../header/header';
import Footer from '../footer/footer';
import { useHistory } from 'react-router-dom';
import Editor from '../editor/editor';
import Preview from '../preview/preview';

const Maker = ({ authService }) => {
  const [cards, setCards] = useState([
    {
      id: '1',
      name: 'Ellie1',
      company: 'samsung',
      theme: 'dark',
      title: 'front',
      email: 'waitwait0301@naver.com',
      message: 'go for it',
      fileName: 'song',
      fileURL: 'ellie.png',
    },
    {
      id: '2',
      name: 'Ellie2',
      company: 'samsung',
      theme: 'light',
      title: 'front',
      email: 'waitwait0301@naver.com',
      message: 'go for it',
      fileName: 'song',
      fileURL: null,
    },
    {
      id: '3',
      name: 'Ellie3',
      company: 'samsung',
      theme: 'colorful',
      title: 'front',
      email: 'waitwait0301@naver.com',
      message: 'go for it',
      fileName: 'song',
      fileURL: null,
    },
  ]);
  const history = useHistory();

  const onLogout = () => {
    authService.logout();
  };

  useEffect(() => {
    authService.onAuthChange((user) => {
      if (!user) {
        history.push('/');
      }
    });
  });

  return (
    <section className={styles.maker}>
      <Header onLogout={onLogout} />
      <div className={styles.container}>
        <Editor cards={cards} />
        <Preview cards={cards} />
      </div>
      <Footer />
    </section>
  );
};

export default Maker;
