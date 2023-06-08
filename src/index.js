import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import MainRouter from './routes';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <MainRouter />
);
reportWebVitals();
