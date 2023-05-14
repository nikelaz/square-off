import React from 'react';
import { createMemoryRouter } from 'react-router-dom';
import Index from './routes/index.jsx';
import Visual from './routes/visual.jsx';

const router = createMemoryRouter([
  {
    path: '/',
    element: <Index />
  },
  {
    path: '/main_window',
    element: <Index />
  },
  {
    path: '/code',
    element: <Visual />
  }
]);

export default router;