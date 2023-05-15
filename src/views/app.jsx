import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { ViewModelProvider } from '../view-models/view-model-provider';
import './styles/index.styl';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <ViewModelProvider>
      <RouterProvider router={router} />
    </ViewModelProvider>
  </React.StrictMode>,
);
