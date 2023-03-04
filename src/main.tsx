import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './components/App'
import './main.scss'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './components/home/Home';
import { Movies } from './components/movies/Movies';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <BrowserRouter>
      <React.StrictMode>
        <App>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
          </Routes>
        </App>
      </React.StrictMode>
    </BrowserRouter>
);