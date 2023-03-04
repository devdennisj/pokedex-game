import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './pages/Router';
import { Toaster } from 'react-hot-toast';

import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Toaster
      position='top-right'
      containerStyle={{
        top: 55,
      }}
      reverseOrder={true}
      toastOptions={{
        duration: 1500,
      }}
    />
    <RouterProvider router={router} />
  </React.StrictMode>
);
