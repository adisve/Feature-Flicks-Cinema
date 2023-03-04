import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './components/App'
import './main.scss'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './components/home/Home';
import { Screenings } from './components/screenings/Screenings';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <BrowserRouter>
      <React.StrictMode>
        <App>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Screenings />} />
          </Routes>
        </App>
      </React.StrictMode>
    </BrowserRouter>
);