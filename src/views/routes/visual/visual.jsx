import React, { useState, useRef, useEffect } from 'react';
import MainLayout from '../../layouts/main-layout.jsx';
import ConditionalRenderer from '../../components/conditional-renderer.jsx';
import { useViewModel } from '../../../view-models/view-model-provider.js';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import styles from './visual.module.styl';
import zoomInIcon from '../../icons/zoom-in.svg';
import zoomOutIcon from '../../icons/zoom-out.svg';
import zoomIcon from '../../icons/zoom.svg';

const Visual = () => {
  const model = useViewModel();
  const [viewport, setViewport] = useState(model.viewports.length > 0 ? model.viewports[0] : 1980);
  const refImageZoomOutBtnRef = useRef(null);
  const diffImageZoomOutBtnRef = useRef(null);
  const compImageZoomOutBtnRef = useRef(null);

  const imagesExist = model.images && model.images[viewport];
  const refImage = imagesExist ? model.images[viewport].refImage : null;
  const diffImage = imagesExist ? model.images[viewport].diffImage : null;
  const compImage = imagesExist ? model.images[viewport].compImage : null;

  const changeViewport = (e) => {
    setViewport(parseInt(e.target.value));

    [refImageZoomOutBtnRef, diffImageZoomOutBtnRef, compImageZoomOutBtnRef].forEach(btnRef => {
      if (btnRef.current) {
        setTimeout(() => btnRef.current.click(), 20);
      }
    });
  };

  return (
  <MainLayout>
    <div className="container pt-1">
      <div className="row row__middle mb-1">
        <div className="col">
          <div className="row row__middle">
            <h4 className="mb-0">Reference Page</h4>
          </div>
        </div>
        <div className="col">
          <div className="row row__middle">
            <ConditionalRenderer condition={model.viewports.length > 0}>
              <select className="w-auto mx-auto" onChange={changeViewport}>
                {model.viewports.map(viewport => 
                  <option value={viewport} key={viewport}>{viewport}vw</option>
                )}
              </select>
            </ConditionalRenderer>
          </div>
          
        </div>
        <div className="col">
          <div className="row row__middle">
            <div className="row row__middle">
              <h4 className="mb-0">Comparison Page</h4>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className={styles.screenshot_border}>
            <ConditionalRenderer condition={refImage}>
              <TransformWrapper wheel={{ disabled: true }} className="test">
                {({ zoomIn, zoomOut, resetTransform}) => (
                  <React.Fragment>
                    <div className={styles.zoom_controls_wrapper}>
                      <div className={`row ${styles.zoom_controls}`}>
                        <button className="button__sec fs-5" onClick={() => zoomIn()}>
                          <img src={zoomInIcon} height="13" />
                          Zoom In
                        </button>
                        <button className="button__sec fs-5" ref={refImageZoomOutBtnRef} onClick={() => zoomOut()}>
                          <img src={zoomOutIcon} height="13" />
                          Zoom Out
                        </button>
                        <button className="button__sec fs-5" onClick={() => resetTransform()}>
                          <img src={zoomIcon} height="13" />
                          Reset
                        </button>
                      </div>
                      <TransformComponent>
                        <img src={`data:image/png;base64, ${refImage}`} className='d-block' />
                      </TransformComponent>
                    </div>
                  </React.Fragment>
                )}
              </TransformWrapper>
            </ConditionalRenderer>
          </div>
        </div>
        <div className="col">
          <div className={styles.screenshot_border}>
            <ConditionalRenderer condition={diffImage}>
              <TransformWrapper wheel={{ disabled: true }}>
                  {({ zoomIn, zoomOut, resetTransform}) => (
                    <React.Fragment>
                      <div className={styles.zoom_controls_wrapper}>
                        <div className={`row ${styles.zoom_controls}`}>
                          <button className="button__sec fs-5" onClick={() => zoomIn()}>
                            <img src={zoomInIcon} height="13" />
                            Zoom In
                          </button>
                          <button className="button__sec fs-5" ref={diffImageZoomOutBtnRef} onClick={() => zoomOut()}>
                            <img src={zoomOutIcon} height="13" />
                            Zoom Out
                          </button>
                          <button className="button__sec fs-5" onClick={() => resetTransform()}>
                            <img src={zoomIcon} height="13" />
                            Reset
                          </button>
                        </div>
                        <TransformComponent>
                          <img src={`data:image/png;base64, ${diffImage}`} className='d-block' />
                        </TransformComponent>
                      </div>
                    </React.Fragment>
                  )}
                </TransformWrapper>
            </ConditionalRenderer>
          </div>
        </div>
        <div className="col">
          <div className={styles.screenshot_border}>
            <ConditionalRenderer condition={compImage}>
              <TransformWrapper wheel={{ disabled: true }}>
                {({ zoomIn, zoomOut, resetTransform}) => (
                  <React.Fragment>
                    <div className={styles.zoom_controls_wrapper}>
                      <div className={`row ${styles.zoom_controls}`}>
                        <button className="button__sec fs-5" onClick={() => zoomIn()}>
                          <img src={zoomInIcon} height="13" />
                          Zoom In
                        </button>
                        <button className="button__sec fs-5" ref={compImageZoomOutBtnRef} onClick={() => zoomOut()}>
                          <img src={zoomOutIcon} height="13" />
                          Zoom Out
                        </button>
                        <button className="button__sec fs-5" onClick={() => resetTransform()}>
                          <img src={zoomIcon} height="13" />
                          Reset
                        </button>
                      </div>
                      <TransformComponent>
                        <img src={`data:image/png;base64, ${compImage}`} className='d-block' />
                      </TransformComponent>
                    </div>
                  </React.Fragment>
                )}
              </TransformWrapper>
            </ConditionalRenderer>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
  );
}

export default Visual;
