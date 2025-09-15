// main.tsx (ou App.tsx)
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ensureMsalInitialized } from './auth/msal';

ensureMsalInitialized().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
