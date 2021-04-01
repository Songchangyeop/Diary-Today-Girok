import React from 'react';
import styles from './modal.module.css';
const Modal = ({ showModal, currentDay }) => {
  const handleCloseBtn = () => {
    showModal();
  };

  return (
    <div className={styles.modal}>
      <h1>{currentDay}일의 일기는 이미 존재합니다 !</h1>
      <button className={styles.close} type="button" onClick={handleCloseBtn}>
        닫기
      </button>
    </div>
  );
};

export default Modal;
