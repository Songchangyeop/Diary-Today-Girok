import React, { useRef } from 'react';
import Button from '../button/button';
import styles from './card_edit_form.module.css';

const CardEditForm = ({ FileInput, card, updateCard, deleteCard }) => {
  const themeRef = useRef();
  const dateRef = useRef();
  const messageRef = useRef();

  const { id, date, message, theme, fileName } = card;

  const onFileChange = (file) => {
    updateCard({
      ...card,
      fileName: file.name,
      fileURL: file.url,
    });
  };

  const onChange = (event) => {
    if (event.currentTarget == null) {
      return;
    }
    console.log(event.currentTarget.value);
    event.preventDefault();
    updateCard({
      ...card,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const onSubmit = () => {
    deleteCard(card);
  };

  return (
    <form className={styles.form}>
      <div className={styles.date}>
        <h1>오늘은</h1>
        <select
          ref={dateRef}
          className={styles.dateSelect}
          name="date"
          placeholder="date"
          value={date}
          onChange={onChange}
        >
          <option placeholder="light">1</option>
          <option placeholder="dark">2</option>
          <option placeholder="colorful">3</option>
          <option placeholder="dark">4</option>
          <option placeholder="colorful">5</option>
        </select>
        <h1>일</h1>
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
