import React from 'react';
import './App.scss';
import Router from './routes';
import { BrowserRouter } from 'react-router-dom';
import { Header, Footer } from './components/common';
import { ToastContainer } from 'react-toastify';
function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="main-container">
        <Router />
      </div>
      <Footer />
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
