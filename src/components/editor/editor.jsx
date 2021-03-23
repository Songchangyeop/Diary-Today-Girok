import React from 'react';
import CardAddForm from '../card_add_form copy/card_add_form';
import CardEditForm from '../card_edit_form/card_edit_form';
import styles from './editor.module.css';

const Editor = ({
  FileInput,
  cards,
  addCard,
  updateCard,
  deleteCard,
  editorOpen,
  editOpen,
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
      <h1 className={styles.title}>Card Maker</h1>
      {Object.keys(cards).map((key) => (
        <CardEditForm
          key={key}
          FileInput={FileInput}
          card={cards[key]}
          updateCard={updateCard}
          deleteCard={deleteCard}
        />
      ))}
      <CardAddForm FileInput={FileInput} onAdd={addCard} />
    </section>
  );
};

export default Editor;
