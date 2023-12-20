import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import HomePage from 'src/HomePage'; // Corrected the import path
import MonthView from 'src/MonthView';
import 'src/index.css';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
    <div className='app'>
        <header>
        <h1>Skej<sup>&reg;</sup></h1>
      <nav>
        <menu>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/MonthView'>Month View</NavLink></li>
        </menu>
      </nav>
      </header>

      <main>
        <Routes>
          <Route path='/' element={<HomePage />} exact />
          <Route path='/MonthView' element={<MonthView />} />
        </Routes>
      </main>
    </div>
  </BrowserRouter>
  </React.StrictMode>, // Add a comma here
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
