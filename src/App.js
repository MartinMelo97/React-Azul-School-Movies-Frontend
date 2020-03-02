import React from 'react';
import './App.css';
import Router from './routes';
import { BrowserRouter } from 'react-router-dom';
import { Header, Footer } from './components/common';
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Router />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
