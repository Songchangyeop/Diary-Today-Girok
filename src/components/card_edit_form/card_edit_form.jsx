import React, { useState } from 'react';
import Button from '../button/button';
import Dropdown from '../dropdown/dropdown';
import Feel from '../feel/feel';
import Modal from '../modal/modal';
import styles from './card_edit_form.module.css';

const CardEditForm = ({
  FileInput,
  card,
  cards,
  updateDay,
  updateCard,
  deleteCard,
  month,
}) => {
  const { date, message, fileName, emotion } = card;
  const [feelOpen, setfeelOpen] = useState(false);
  const [openDay, setOpenDay] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [SelectDay, setSelectDay] = useState();
  const [currentEvent, setCurrentEvent] = useState();
  const getdate = new Date();
  const year = getdate.getFullYear();
  const day = new Date(year, month, 0).getDate();
  let currentEmotion = '';
  const onFileChange = (file) => {
    updateCard({
      ...card,
      fileName: file.name,
      fileURL: file.url,
    });
  };

  const onUpdateEmotion = (e) => {
    updateCard({
      ...card,
      [e]: currentEmotion,
    });
  };

  const onChange = (event, date, newId, beforeId) => {
    if (event.target.value === null) {
      console.log(event.target);
      return;
    }

    event.preventDefault();
    let value = event.target.value;
    let currentId = `${year}${month}${value}`;
    date
      ? updateDay({
          ...card,
          [date]: value,
          [newId]: currentId,
          [beforeId]: card.id,
        })
      : updateCard({
          ...card,
          [event.target.name]: value,
        });
  };

  const onSubmit = () => {
    deleteCard(card);
  };

  const showDayList = () => {
    if (openDay === true) {
      setOpenDay(false);
    } else {
      setOpenDay(true);
    }
  };

  const showModal = (event, name, newId, beforeId) => {
    setCurrentEvent(event);
    let value = event.target.value;
    let currentId = `${year}${month}${value}`;
    const cardsToArr = Object.entries(cards);

    for (let i = 0; i < cardsToArr.length; i++) {
      if (cardsToArr[i][1].id === currentId) {
        setSelectDay(value);
        setOpenModal(true);
        return;
      }
    }
    onChange(event, name, newId, beforeId);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  const allowUpdate = () => {
    onChange(currentEvent, 'date', 'id', 'beforeId');
    setOpenModal(false);
  };

  const handleFeelComponent = () => {
    showFeelComponent('open');
  };

  const showFeelComponent = (value) => {
    if (value === 'open') {
      setfeelOpen(true);
    } else {
      setfeelOpen(false);
    }
  };

  const changeEmotion = (newEmotion) => {
    currentEmotion = newEmotion;
    onUpdateEmotion('emotion');
  };

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
      <form className={styles.form}>
        {openModal && (
          <Modal
            showEditFormModal={closeModal}
            currentDay={SelectDay}
            allowUpdate={allowUpdate}
          ></Modal>
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
                    value={'dayEdit'}
                    onChange={showModal}
                  ></Dropdown>
                ))}
            </ul>
            <span className={styles.dayText}>{`${date} 일`}</span>
          </div>
        </div>

        <div className={styles.select}>
          <span className={styles.selectEmotion} onClick={handleFeelComponent}>
            {emotion}
          </span>
        </div>
        <textarea
          className={styles.textarea}
          name="message"
          value={message}
          onChange={onChange}
        />
        <div className={styles.fileInput}>
          <FileInput name={fileName} onFileChange={onFileChange} />
        </div>
        <Button name="Delete" onClick={onSubmit} />
      </form>
    </>
  );
};

export default CardEditForm;
