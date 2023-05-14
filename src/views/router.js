import React from 'react';
import { createMemoryRouter } from 'react-router-dom';
import Code from './routes/code.jsx';
import Visual from './routes/visual.jsx';
import Settings from './routes/settings.jsx'

const router = createMemoryRouter([
  {
    path: '/',
    element: <Code />
  },
  {
    path: '/main_window',
    element: <Code />
  },
  {
    path: '/visual',
    element: <Visual />
  },
  {
    path: '/settings',
    element: <Settings />
  }
]);

export default router;