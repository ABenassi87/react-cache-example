import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './assets/main.css';
import Layout from './components/Layout';
import Home from './pages/Home';
import ViewDetails from './pages/ViewDetails';
import NoMatch from './pages/NoMatch';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='crypto/:cryptoId' element={<ViewDetails />} />
        <Route path='*' element={<NoMatch />} />
      </Route>
    </Routes>
  );
}

export default App;
