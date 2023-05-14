import React from 'react';
import ProgressBar from '../../components/progress-bar/progress-bar.jsx';
import ConditionalRenderer from '../../components/conditional-renderer.jsx';
import Modal from '../modal/modal.jsx';
import styles from './form-bar.module.styl';
import { useViewModel } from '../../../view-models/view-model-provider.js';

const FormBar = () => {
  const model = useViewModel();

  return (
    <div className={styles.wrapper}>
      <form onSubmit={model.submitHandler}>
        <div className="row row__bottom">
          <div className="col">
            <label>Reference URL:</label>
            <input name="refPageUrl" type="text" />
          </div>
          <div className="col">
            <label>Comparison URL:</label>
            <input name="compPageUrl" type="text" />
          </div>
          <button type="submit">Compare</button>
        </div>
        
        <ConditionalRenderer condition={model.progress && model.progress !== 100}>
          <Modal>
            <ProgressBar value={model.progress} className="mb-1" />
            <div>{model.statusMessage}...</div>
          </Modal>
        </ConditionalRenderer>
      </form>
    </div>
  );
};

export default FormBar;
