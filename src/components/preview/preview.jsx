import React from 'react';
import Card from '../card/card';
import styles from './preview.module.css';

const Preview = ({ cards, editorOpen, editOpen }) => {
  const btnClick = (e) => {
    console.log(e.target.value);
    editorOpen(e.target.value);
  };

  return (
    <section className={styles.preview}>
      <ul className={styles.cards}>
        <h1 className={styles.title}>Diary Preview</h1>
        {Object.keys(cards).map((key) => (
          <Card key={key} card={cards[key]} />
        ))}
        {!editOpen && (
          <button
            className={styles.open}
            type="button"
            onClick={btnClick}
            value="write"
          >
            쓰기
          </button>
        )}
      </ul>
    </section>
  );
};

export default Preview;
