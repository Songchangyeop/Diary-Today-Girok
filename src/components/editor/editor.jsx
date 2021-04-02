import React from 'react';
import CardAddForm from '../card_add_form copy/card_add_form';
import CardEditForm from '../card_edit_form/card_edit_form';
import styles from './editor.module.css';

const Editor = ({
  FileInput,
  cards,
  createCard,
  updateCard,
  deleteCard,
  editorOpen,
  editOpen,
  month,
  showFeelComponent,
  currentEmotion,
  changeClickedEditor,
}) => {
  const btnClick = (event) => {
    editorOpen(event.target.value);
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

      <h1 className={styles.title}>일기 쓰기</h1>
      <CardAddForm
        FileInput={FileInput}
        onAdd={createCard}
        month={month}
        cards={cards}
        showFeelComponent={showFeelComponent}
        currentEmotion={currentEmotion}
      />
      <div className={styles.bar}></div>
      <h1 className={styles.title}>일기 편집</h1>
      {Object.keys(cards).map((key) => (
        <CardEditForm
          key={key}
          FileInput={FileInput}
          card={cards[key]}
          updateDay={updateCard}
          updateCard={createCard}
          deleteCard={deleteCard}
          month={month}
          cards={cards}
          showFeelComponent={showFeelComponent}
          changeClickedEditor={changeClickedEditor}
        />
      ))}
    </section>
  );
};

export default Editor;
