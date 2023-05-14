import React from 'react';
import MainLayout from '../layouts/main-layout.jsx';
import { useViewModel } from '../../view-models/view-model-provider.js';

const Visual = () => {
  const model = useViewModel();

  return (
  <MainLayout>
    <div className="container">
      <div className="row">
        <div className="col">
          <h4>Reference Page</h4>
          { model.refImage ? <img src={`data:image/png;base64, ${model.refImage}`} /> : null }
        </div>
        <div className="col">
          <h4>Visual Differences</h4>
          { model.diffImage ? <img src={`data:image/png;base64, ${model.diffImage}`} /> : null }
        </div>
        <div className="col">
          <h4>Comparison Page</h4>
          { model.compImage ? <img src={`data:image/png;base64, ${model.compImage}`} /> : null }
        </div>
      </div>
    </div>
  </MainLayout>
  );
}

export default Visual;
