import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Add Routes and Route
import './index.css';
import App from './App.tsx';
import SharePage from './components/SharePage.tsx'; // Import the new SharePage component

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/share" element={<SharePage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);