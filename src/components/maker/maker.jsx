import React, { useEffect, useState } from 'react';
import styles from './maker.module.css';
import Header from '../header/header';
import Footer from '../footer/footer';
import { useHistory } from 'react-router-dom';
import Editor from '../editor/editor';
import Preview from '../preview/preview';

const Maker = ({ FileInput, authService }) => {
  const [cards, setCards] = useState({
    1: {
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
    2: {
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
    3: {
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
  });

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

  const createOrupdateCard = (card) => {
    setCards((cards) => {
      const updated = { ...cards };
      updated[card.id] = card;
      return updated;
    });
  };

  const deleteCard = (card) => {
    setCards((cards) => {
      const updated = { ...cards };
      delete updated[card.id];
      return updated;
    });
  };

  return (
    <section className={styles.maker}>
      <Header onLogout={onLogout} />
      <div className={styles.container}>
        <Editor
          FileInput={FileInput}
          cards={cards}
          addCard={createOrupdateCard}
          updateCard={createOrupdateCard}
          deleteCard={deleteCard}
        />
        <Preview cards={cards} />
      </div>
      <Footer />
    </section>
  );
};

export default Maker;
