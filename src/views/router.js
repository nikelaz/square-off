import React from 'react';
import { createMemoryRouter } from 'react-router-dom';
import Code from './routes/code.jsx';
import Visual from './routes/visual/visual.jsx';

const router = createMemoryRouter([
  {
    path: '/',
    element: <Code />
  },
  {
    path: '/main_window',
    element: <Code />,
    
  },
  {
    path: '/visual',
    element: <Visual />
  }
]);

export default router;