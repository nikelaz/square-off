import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Index from './routes/index.jsx';

const router = createBrowserRouter([
  {
    path: '/main_window',
    element: <Index />
  },
  {
    path: '/test',
    element: <div>Test route</div>
  }
]);

export default router;