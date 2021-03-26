import React, { memo, useRef, useState } from 'react';
import Button from '../button/button';
import styles from './card_add_form.module.css';

const CardAddForm = memo(({ FileInput, onAdd }) => {
  const formRef = useRef();
  const themeRef = useRef();
  const dateRef = useRef();
  const messageRef = useRef();
  const [file, setFile] = useState({
    fileName: null,
    fileURL: null,
  });

  const onFileChange = (file) => {
    setFile({
      fileName: file.name,
      fileURL: file.url,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const card = {
      id: Date.now(), //uuid
      theme: themeRef.current.value,
      date: themeRef.current.value,
      message: messageRef.current.value || '',
      fileName: file.fileName || '',
      fileURL: file.fileURL || '',
    };
    formRef.current.reset();
    setFile({
      fileName: file.name,
      fileURL: file.url,
    });
    onAdd(card);
  };

  return (
    <form ref={formRef} className={styles.form}>
      <div className={styles.date}>
        <h1>오늘은</h1>
        <select
          ref={dateRef}
          className={styles.dateSelect}
          name="date"
          placeholder="date"
        >
          <option placeholder="light">1</option>
          <option placeholder="dark">2</option>
          <option placeholder="colorful">3</option>
        </select>
        <h1>일</h1>
      </div>
      <h1 className={styles.feel}>오늘의 기분은</h1>
      {/* <input
        ref={nameRef}
        className={styles.input}
        type="text"
        name="name"
        placeholder="Name"
      /> */}
      {/* <input
        ref={companyRef}
        className={styles.input}
        type="text"
        name="company"
        placeholder="Company"
      /> */}

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
      {/* <input
        ref={titleRef}
        className={styles.input}
        type="text"
        name="title"
        placeholder="Title"
      />
      <input
        ref={emailRef}
        className={styles.input}
        type="text"
        name="email"
        placeholder="Email"
      /> */}
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
