import React, { useState } from 'react';
import Login from './pages/Login';
import Signup from './pages/Signup';

const App = () => {
  // State to manage the current "page"
  const [currentPage, setCurrentPage] = useState('login');

  return (
    <div>
      {/* Conditionally render components based on the currentPage state */}
      {currentPage === 'login' && <Login setCurrentPage={setCurrentPage} />}
      {currentPage === 'signup' && <Signup setCurrentPage={setCurrentPage} />}
    </div>
  );
};

export default App;
