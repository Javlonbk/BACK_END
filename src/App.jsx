import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Auth from './components/Auth'
import Category from './components/Category';


function App() {
  return ( 
      <div className='app'>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path='/category' element={<Category />} />
        </Routes>
      </div>
  );
}

export default App;
