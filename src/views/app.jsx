import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Index from './routes/index.jsx';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

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

function render() {
  ReactDOM.render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
    document.getElementById('root')
  );
}

render();
