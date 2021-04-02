import React, { useCallback, useEffect, useState } from 'react';
import styles from './maker.module.css';
import Header from '../header/header';
import Footer from '../footer/footer';
import { useHistory } from 'react-router-dom';
import Editor from '../editor/editor';
import Preview from '../preview/preview';
import Diary from '../diary/diary';
import Feel from '../feel/feel';

const Maker = ({ FileInput, authService, cardRepository }) => {
  const historyState = useHistory().state;
  const [cards, setCards] = useState({});
  const [userId, setUserId] = useState(historyState && historyState.id);
  const [editOpen, setEditOpen] = useState(false);
  const [month, setMonth] = useState('01');
  const [readCard, setReadCard] = useState();
  const [diaryOpen, setDiaryOpen] = useState(false);
  const history = useHistory();
  const onLogout = useCallback(() => {
    authService.logout();
  }, [authService]);

  useEffect(() => {
    if (!userId) {
      return;
    }

    const stopSync = cardRepository.syncCards(
      userId,
      (cards) => {
        //syncCards 함수 호출 후 ref.off 리턴받아 stopSync에 할당
        setCards(cards);
      },
      month
    );
    //useEffct에서 return은 언마운트 될 시에 실행
    return () => stopSync(); // 불필요한 네트워크 사용을 최소화 하기위해  ref.off
  }, [userId, cardRepository, month]);

  useEffect(() => {
    authService.onAuthChange((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        history.push('/');
      }
    });
  }, [authService, userId, history]);

  const updateCard = (card) => {
    setCards((cards) => {
      const updated = { ...cards };
      delete updated[card.beforeId];
      return updated;
    });
    cardRepository.removeCard(userId, card, month, 'update');

    setCards((cards) => {
      const updated = { ...cards };
      updated[card.id] = card;
      return updated;
    });
    cardRepository.saveCard(userId, card, month);
  };

  const createCard = (card) => {
    setCards((cards) => {
      const updated = { ...cards };
      updated[card.id] = card;
      return updated;
    });
    cardRepository.saveCard(userId, card, month);
  };

  const deleteCard = (card) => {
    setCards((cards) => {
      const updated = { ...cards };
      delete updated[card.id];
      return updated;
    });
    cardRepository.removeCard(userId, card, month);
  };

  const editorOpen = (value) => {
    if (value === 'write') {
      setEditOpen(true);
    } else {
      setEditOpen(false);
    }
  };

  const updateMonth = (newMonth) => {
    // console.log(newMonth);
    setMonth(newMonth);
  };

  const readDiary = (selectCard) => {
    setReadCard(selectCard);
  };

  const openDiary = (value) => {
    if (value === 'open') {
      setDiaryOpen(true);
    } else {
      setDiaryOpen(false);
    }
  };

  return (
    <section className={styles.maker}>
      <Header onLogout={onLogout} />
      <div className={styles.container}>
        <div className={styles.dairyContainer}>
          {diaryOpen && (
            <Diary readCard={readCard} openDiary={openDiary}></Diary>
          )}
        </div>
        <Preview
          cards={cards}
          editorOpen={editorOpen}
          editOpen={editOpen}
          updateMonth={updateMonth}
          readDiary={readDiary}
          openDiary={openDiary}
        />
        {editOpen && (
          <Editor
            FileInput={FileInput}
            cards={cards}
            createCard={createCard}
            updateCard={updateCard}
            deleteCard={deleteCard}
            editorOpen={editorOpen}
            editOpen={editOpen}
            month={month}
          />
        )}
      </div>
      <Footer />
    </section>
  );
};

export default Maker;
