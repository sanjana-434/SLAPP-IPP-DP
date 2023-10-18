import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import OrderPage from './components/OrderPage';
import DataPage from './components/DatePage';

function App() {
  return (
    <div className="App">
      {/* <h1>Storage Location Assignment Planning for Snack Shop</h1> */}
      <Router>
        <Routes>
          <Route path="/" element={<OrderPage />} />
          <Route path="/data" element={<DataPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
