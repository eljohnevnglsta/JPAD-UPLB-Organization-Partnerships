import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ReportsPage from './pages/ReportsPage';
import SearchTable from './components/SearchTable/SearchTable';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchTable />} />
        <Route path="/reports" element={<ReportsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
