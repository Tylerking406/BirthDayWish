import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js'; // Added .js extension
import { NotificationProvider } from './context/NotificationContext.js'; // Import Notification Provider
import './index.css';
import reportWebVitals from './reportWebVitals.js'; // Added .js extension

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NotificationProvider> {/* Wrap App with NotificationProvider */}
      <App />
    </NotificationProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
