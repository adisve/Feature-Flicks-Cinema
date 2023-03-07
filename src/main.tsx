import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './components/App'
import './main.scss'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './components/home/Home';
import { Screenings } from './components/screenings/Screenings';
import { Booking } from './components/booking/Booking';
import { ErrorRoute } from './components/errors/ErrorRoute';
import { BookScreening } from './components/booking/BookScreening';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <BrowserRouter>
      <React.StrictMode>
        <App>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/screenings" element={<Screenings />} />
            <Route path="/book/:id" element={<Booking />} />
            <Route path="/book/screening/:id" element={<BookScreening />} />
            <Route path="*" element={<ErrorRoute />} />
          </Routes>
        </App>
      </React.StrictMode>
    </BrowserRouter>
);