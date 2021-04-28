import React, { memo } from 'react';
import styles from './modal.module.css';
const Modal = memo(
  ({ showAddFormModal, showEditFormModal, currentDay, allowUpdate }) => {
    const handleCloseBtn = () => {
      showAddFormModal ? showAddFormModal() : showEditFormModal();
    };

    return (
      <div className={styles.modal}>
        <h1>{currentDay}일의 일기는 이미 존재합니다 !</h1>
        {showEditFormModal && (
          <span className={styles.span}>
            {currentDay}일의 일기를 없애고 이 날짜의 일기로 <br />
            변경하시겠습니까?
          </span>
        )}
        <div className={styles.container}>
          {showEditFormModal && (
            <button
              className={styles.close}
              type="button"
              onClick={allowUpdate}
            >
              예
            </button>
          )}
          <button
            className={styles.close}
            type="button"
            onClick={handleCloseBtn}
          >
            닫기
          </button>
        </div>
      </div>
    );
  }
);

export default Modal;
