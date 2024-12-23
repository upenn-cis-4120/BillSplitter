import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // BrowserRouter imported here
import App from './App';
import './index.css'; // Optional global styles
import * as serviceWorkerRegistration from './serviceWorkerRegistration'; // For PWA

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

serviceWorkerRegistration.register(); // For PWA
