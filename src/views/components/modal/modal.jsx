import React from 'react';
import styles from './modal.module.styl';

const Modal = ({ children }) => (
  <div className={styles.outer_wrapper}>
    <div className={styles.wrapper}>
      {children}
    </div>
  </div>
);

export default Modal;
