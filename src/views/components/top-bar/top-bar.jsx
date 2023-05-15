import React from 'react';
import ProgressBar from '../progress-bar/progress-bar.jsx';
import ConditionalRenderer from '../conditional-renderer.jsx';
import Modal from '../modal/modal.jsx';
import Link from '../link.jsx';
import styles from './top-bar.module.styl';
import { useViewModel } from '../../../view-models/view-model-provider.js';
import codeIcon from '../../icons/code.svg';
import imageIcon from '../../icons/image.svg';
import compareIcon from '../../icons/compare.svg';

const TopBar = () => {
  const model = useViewModel();

  return (
    <div className={styles.wrapper}>
      <form onSubmit={model.submitHandler}>
        <div className="row row__bottom">
          <nav className={styles.navigation}>
            <Link to="/" activeClass={styles.is_active}>
              <img src={codeIcon} height="16" />
              Code
            </Link>
            <Link to="/visual" activeClass={styles.is_active}>
              <img src={imageIcon} height="16" />
              Visual
            </Link>
          </nav>
          <div className={`row row__center as-center ${styles.row__form}`}>
            <div className="col">
              <input
                name="refPageUrl"
                type="url"
                placeholder="Reference URL"
                required
              />
            </div>
            <div className="col">
              <input
                name="compPageUrl"
                type="url"
                placeholder="Comparison URL"
                required
              />
            </div>
            <button type="submit">
              <img src={compareIcon} height="13" />
              Compare
            </button>
          </div>
        </div>
        
        <ConditionalRenderer condition={model.progress && model.progress !== 100}>
          <Modal>
            <ProgressBar value={model.progress} idle={model.progress < 10} />
            <ConditionalRenderer condition={model.statusMessage}>
              <div className="fs-5 mt-1">{model.statusMessage}...</div>
            </ConditionalRenderer>
          </Modal>
        </ConditionalRenderer>
      </form>
    </div>
  );
};

export default TopBar;
