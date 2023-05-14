import React from 'react';
import styles from './progress-bar.module.styl';

const ProgressBar = ({ value }) => (
  <div className={styles.wrapper}>
    <div className={styles.progress} style={{ width: `${value}%` }}>
      <div className={styles.progress_inner_container}>
        {value > 10 ? `${value}%` : <span>&nbsp;</span>}
      </div>
    </div>
  </div>
);

export default ProgressBar;
