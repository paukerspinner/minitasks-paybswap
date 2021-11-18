import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom"

import IndexPage from './pages/IndexPage'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<IndexPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
