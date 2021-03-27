import React from 'react';
import CardAddForm from '../card_add_form copy/card_add_form';
import CardEditForm from '../card_edit_form/card_edit_form';
import Month from '../month/month';
import styles from './editor.module.css';

const Editor = ({
  FileInput,
  cards,
  addCard,
  updateCard,
  deleteCard,
  editorOpen,
  editOpen,
  updateMonth,
  month,
}) => {
  const btnClick = (e) => {
    editorOpen(e.target.value);
  };
  return (
    <section className={styles.editor}>
      {editOpen && (
        <button
          className={styles.close}
          type="button"
          onClick={btnClick}
          value="close"
        >
          닫기
        </button>
      )}
      <Month updateMonth={updateMonth}></Month>
      <h1 className={styles.title}>Diary Maker</h1>
      <CardAddForm FileInput={FileInput} onAdd={addCard} month={month} />
      <div className={styles.bar}></div>
      {Object.keys(cards).map((key) => (
        <CardEditForm
          key={key}
          FileInput={FileInput}
          card={cards[key]}
          updateCard={updateCard}
          deleteCard={deleteCard}
        />
      ))}
    </section>
  );
};

export default Editor;
