import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import '../src/Pages/Login/login.css';
import App from './App';
import { AuthProvider } from './Pages/providers/authProvider';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
