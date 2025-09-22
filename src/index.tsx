import React from 'react';
import { createRoot } from 'react-dom/client';
import 'normalize.css';
import './index.scss';
import './fonts/fonts.scss';
import App from './components/app/app';

const root = document.getElementById('root') as HTMLElement;
if (!root)
  throw new Error ('\"root\" node not found!');

createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
