import React, { useCallback, useState } from 'react';
import Card from '../card/card';
import Dropdown from '../dropdown/dropdown';
import styles from './preview.module.css';

const Preview = ({
  cards,
  editorOpen,
  editOpen,
  updateMonth,
  readDiary,
  openDiary,
}) => {
  const [openMonth, setOpenMonth] = useState(false);
  const [currentMonth, setCurrentMonth] = useState('1');
  const monthCount = 12;

  const btnClick = (e) => {
    editorOpen(e.target.value);
  };

  const showMonthList = useCallback(() => {
    if (openMonth === true) {
      setOpenMonth(false);
    } else {
      setOpenMonth(true);
    }
  }, [openMonth]);

  const changeCurrentMonth = useCallback((changeMonth) => {
    setCurrentMonth(changeMonth);
  }, []);

  return (
    <section className={styles.preview}>
      <div className={styles.container}>
        <h1 className={styles.title}>일기 목록</h1>
        <div
          className={`${styles.month}  ${openMonth && styles.clickMonth}`}
          onClick={showMonthList}
        >
          <span>{`${currentMonth}월`}</span>
          <ul className={styles.dropDown}>
            {openMonth &&
              [...Array(monthCount)].map((num, index) => (
                <Dropdown
                  key={index}
                  updateMonth={updateMonth}
                  showMonthList={showMonthList}
                  index={index}
                  changeCurrentMonth={changeCurrentMonth}
                  value={'month'}
                ></Dropdown>
              ))}
          </ul>
        </div>
      </div>
      <ul className={styles.cards}>
        {Object.keys(cards).map((key) => (
          <Card
            key={key}
            card={cards[key]}
            readDiary={readDiary}
            openDiary={openDiary}
          />
        ))}

        {!editOpen && (
          <button
            className={styles.open}
            type="button"
            onClick={btnClick}
            value="write"
          >
            편집
          </button>
        )}
      </ul>
    </section>
  );
};

export default Preview;
