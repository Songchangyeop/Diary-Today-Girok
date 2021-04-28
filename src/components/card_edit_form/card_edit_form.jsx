import React, { memo, useCallback, useState } from 'react';
import Button from '../button/button';
import Dropdown from '../dropdown/dropdown';
import Feel from '../feel/feel';
import Modal from '../modal/modal';
import styles from './card_edit_form.module.css';

const CardEditForm = memo(
  ({ FileInput, card, cards, updateDay, updateCard, deleteCard, month }) => {
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

    const onFileChange = useCallback(
      (file) => {
        updateCard({
          ...card,
          fileName: file.name,
          fileURL: file.url,
        });
      },
      [updateCard, card]
    );

    const onUpdateEmotion = (e) => {
      updateCard({
        ...card,
        [e]: currentEmotion,
      });
    };

    const onChange = useCallback(
      (event, date, newId, beforeId) => {
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
      },
      [card, month, updateDay, updateCard, year]
    );

    const onSubmit = useCallback(() => {
      deleteCard(card);
    }, [deleteCard, card]);

    const showDayList = useCallback(() => {
      if (openDay === true) {
        setOpenDay(false);
      } else {
        setOpenDay(true);
      }
    }, [openDay]);

    const showModal = useCallback(
      (event, date, newId, beforeId) => {
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
        onChange(event, date, newId, beforeId);
      },
      [cards, month, onChange, year]
    );

    const closeModal = useCallback(() => {
      setOpenModal(false);
    }, []);

    const allowUpdate = useCallback(() => {
      onChange(currentEvent, 'date', 'id', 'beforeId');
      setOpenModal(false);
    }, [currentEvent, onChange]);

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
      currentEmotion = newEmotion;
      onUpdateEmotion('emotion');
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
              className={`${styles.dateContainer} ${
                openDay && styles.clickDay
              }`}
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
            <span
              className={styles.selectEmotion}
              onClick={handleFeelComponent}
            >
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
  }
);

export default CardEditForm;
