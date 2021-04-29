import React, { memo, useCallback, useRef, useState } from 'react';
import Button from '../button/button';
import Dropdown from '../dropdown/dropdown';
import Feel from '../feel/feel';
import Modal from '../modal/modal';
import styles from './card_add_form.module.css';

const CardAddForm = memo(({ FileInput, onAdd, month, cards }) => {
  const formRef = useRef();
  const messageRef = useRef();
  const [file, setFile] = useState({
    fileName: null,
    fileURL: null,
  });
  const [feelOpen, setfeelOpen] = useState(false);
  const [currentEmotion, setCurrentEmotion] = useState('😀');
  const [openDay, setOpenDay] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const getdate = new Date();
  const year = getdate.getFullYear();
  const day = new Date(year, month, 0).getDate();
  const thisDay = getdate.getDate();
  const [currentDay, setCurrentDay] = useState(thisDay);

  const onFileChange = useCallback((file) => {
    setFile({
      fileName: file.name,
      fileURL: file.url,
    });
  }, []);

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();
      const cardsToArr = Object.entries(cards);
      for (let i = 0; i < cardsToArr.length; i++) {
        if (cardsToArr[i][1].date === currentDay) {
          setOpenModal(true);
          return;
        }
      }
      let today = `${year}${month}${currentDay}`;
      const card = {
        id: today, //uuid
        emotion: currentEmotion,
        date: currentDay,
        message: messageRef.current.value || '일기가 없습니다!',
        fileName: file.fileName || '',
        fileURL: file.fileURL || '',
        beforeId: today,
      };
      formRef.current.reset();
      onAdd(card);
    },
    [
      cards,
      currentDay,
      currentEmotion,
      file.fileName,
      file.fileURL,
      month,
      onAdd,
      year,
    ]
  );

  const showDayList = useCallback(() => {
    if (openDay === true) {
      setOpenDay(false);
    } else {
      setOpenDay(true);
    }
  }, [openDay]);

  const changeCurrentDay = useCallback((changeDay) => {
    setCurrentDay(changeDay);
  }, []);

  const showModal = useCallback(() => {
    setOpenModal(false);
  }, []);

  const handleFeelComponent = () => {
    showFeelComponent('open');
  };

  const showFeelComponent = useCallback((value) => {
    if (value === 'open') {
      setfeelOpen(true);
    } else {
      setfeelOpen(false);
    }
  }, []);

  const changeEmotion = useCallback((newEmotion) => {
    setCurrentEmotion(newEmotion);
  }, []);

  return (
    <>
      {feelOpen && (
        <div className={styles.container}>
          <Feel
            changeEmotion={changeEmotion}
            showFeelComponent={showFeelComponent}
          ></Feel>
        </div>
      )}
      <form ref={formRef} className={styles.form}>
        {openModal && (
          <Modal showAddFormModal={showModal} currentDay={currentDay}></Modal>
        )}
        <div className={styles.date}>
          <h1>오늘은</h1>
          <div
            className={`${styles.dateContainer} ${openDay && styles.clickDay}`}
            onClick={showDayList}
          >
            <ul className={styles.dropDown}>
              {openDay &&
                [...Array(day)].map((num, index) => (
                  <Dropdown
                    key={index}
                    showDayList={showDayList}
                    index={index}
                    changeCurrentDay={changeCurrentDay}
                    value={'dayAdd'}
                  ></Dropdown>
                ))}
            </ul>
            <span className={styles.dayText}>{`${currentDay} 일`}</span>
          </div>
        </div>

        <div className={styles.select}>
          <span className={styles.selectEmotion} onClick={handleFeelComponent}>
            {currentEmotion}
          </span>
        </div>
        <textarea
          ref={messageRef}
          className={styles.textarea}
          name="message"
          placeholder="오늘을 기록하세요..."
        />
        <div className={styles.fileInput}>
          <FileInput name={file.fileName} onFileChange={onFileChange} />
        </div>
        <Button name="Add" onClick={onSubmit} />
      </form>
    </>
  );
});

export default CardAddForm;
