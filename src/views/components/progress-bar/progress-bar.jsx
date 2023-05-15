import React from 'react';
import styles from './progress-bar.module.styl';

const ProgressBar = ({ value, className, idle }) => (
  <div className={`${styles.wrapper} ${className}`}>
    <div className={styles.progress} style={{ width: `${idle ? 100 : value}%` }}>
      <div className={styles.progress_inner_container}>
        {value > 10 ? `${value}%` : <span>&nbsp;</span>}
      </div>
    </div>
  </div>
);

export default ProgressBar;
