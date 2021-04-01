import React, { useRef, useState } from 'react';
import Button from '../button/button';
import Dropdown from '../dropdown/dropdown';
import styles from './card_edit_form.module.css';

const CardEditForm = ({ FileInput, card, updateCard, deleteCard, month }) => {
  const themeRef = useRef();
  const messageRef = useRef();

  const [openDay, setOpenDay] = useState(false);

  const getdate = new Date();
  const year = getdate.getFullYear();
  const day = new Date(year, month, 0).getDate();

  const { id, date, message, theme, fileName } = card;

  const onFileChange = (file) => {
    updateCard({
      ...card,
      fileName: file.name,
      fileURL: file.url,
    });
  };

  const onChange = (event, name) => {
    if (event.currentTarget == null) {
      return;
    }
    event.preventDefault();
    let value = event.currentTarget.value;
    name
      ? updateCard({
          ...card,
          [name]: value,
          [card.key]: `${year}${month}${value}`,
        })
      : updateCard({
          ...card,
          [event.currentTarget.name]: value,
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

  return (
    <form className={styles.form}>
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
                  onChange={onChange}
                ></Dropdown>
              ))}
          </ul>
          <span className={styles.dayText}>{`${date} 일`}</span>
        </div>
      </div>

      <h1 className={styles.feel}>오늘의 기분은</h1>
      <select
        ref={themeRef}
        className={styles.select}
        name="theme"
        value={theme}
        onChange={onChange}
      >
        <option placeholder="light">그저그래요</option>
        <option placeholder="dark">나빠요</option>
        <option placeholder="colorful">우울해요</option>
      </select>
      <textarea
        ref={messageRef}
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
  );
};

export default CardEditForm;
