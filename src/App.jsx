import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import ReportsPage from './pages/ReportsPage';
import SearchTable from './components/SearchTable/SearchTable';

const App = () => {
  const [users, setUsers] = useState([]);

  // Fetch users from the backend
  useEffect(() => {
    axios.get('http://localhost:3001/getUsers')
      .then(response => setUsers(response.data))
      .catch(err => console.log('Error fetching users:', err));
  }, []);

    // Fetch users from the backend
    useEffect(() => {
      axios.get('http://localhost:3001/getReports')
        .then(response => setUsers(response.data))
        .catch(err => console.log('Error fetching reports:', err));
    }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchTable users={users} />} />
        <Route path="/reports" element={<ReportsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
