import React, { memo, useRef, useState } from 'react';
import Button from '../button/button';
import Dropdown from '../dropdown/dropdown';
import Modal from '../modal/modal';
import styles from './card_add_form.module.css';

const CardAddForm = memo(({ FileInput, onAdd, month, cards }) => {
  const formRef = useRef();
  const themeRef = useRef();
  const messageRef = useRef();
  const [file, setFile] = useState({
    fileName: null,
    fileURL: null,
  });
  const [openDay, setOpenDay] = useState(false);
  const [currentDay, setCurrentDay] = useState('1');
  const [openModal, setOpenModal] = useState(false);
  const getdate = new Date();
  const year = getdate.getFullYear();
  const day = new Date(year, month, 0).getDate();

  const onFileChange = (file) => {
    setFile({
      fileName: file.name,
      fileURL: file.url,
    });
  };

  const onSubmit = (event) => {
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
      theme: themeRef.current.value,
      date: currentDay,
      message: messageRef.current.value || '일기가 없습니다!',
      fileName: file.fileName || '',
      fileURL: file.fileURL || '',
      today: today,
    };
    formRef.current.reset();
    setFile({
      fileName: file.name,
      fileURL: file.url,
    });
    onAdd(card);
  };

  const showDayList = () => {
    if (openDay === true) {
      setOpenDay(false);
    } else {
      setOpenDay(true);
    }
  };
  const changeCurrentDay = (changeDay) => {
    setCurrentDay(changeDay);
  };

  const showModal = () => {
    setOpenModal(false);
  };

  return (
    <form ref={formRef} className={styles.form}>
      {openModal && (
        <Modal showModal={showModal} currentDay={currentDay}></Modal>
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
      <h1 className={styles.feel}>오늘의 기분은</h1>

      <select
        ref={themeRef}
        className={styles.select}
        name="theme"
        placeholder="Theme"
      >
        <option placeholder="light">그저그래요</option>
        <option placeholder="dark">나빠요</option>
        <option placeholder="colorful">우울해요</option>
      </select>

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
  );
});

export default CardAddForm;
