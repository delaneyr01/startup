import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import HomePage from './HomePage'; // Corrected the import path
import MonthView from './MonthView';
import './App.css';

function App() {
    return (
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
                <Route path='*' element={<NotFound />} />
                </Routes>
            </main>
            </div>
        </BrowserRouter>
    );
}

function NotFound() {
    return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
  }

export default App;
