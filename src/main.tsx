import React from 'react'
import ReactDOM, { createRoot } from 'react-dom/client'
import { App } from './components/App'
import './main.scss'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Screenings } from './components/screenings/Screenings';
import { SelectScreening } from './components/booking/SelectScreening';
import { ErrorRoute } from './components/errors/ErrorRoute';
import { Booking } from './components/booking/book_screening/Booking';
import { Hero } from './components/home/Hero';


createRoot(document.getElementById('root') as HTMLElement).render(
    <BrowserRouter>
      <React.StrictMode>
        <App>
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/screenings" element={<Screenings />} />
            <Route path="/book/:id" element={<SelectScreening />} />
            <Route path="/book/screening/:id" element={<Booking />} />
            <Route path="*" element={<ErrorRoute />} />
          </Routes>
        </App>
      </React.StrictMode>
    </BrowserRouter>
);