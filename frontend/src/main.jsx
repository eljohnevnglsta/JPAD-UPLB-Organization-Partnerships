import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Management from './pages/Management';
import CreateEvent from './pages/createevent';
import CreatePost from './pages/createpost';
import Search from './pages/Search';
import Dashboard from './pages/Dashboard';
import './index.css';
import NavigationBar from './components/NavigationBar/NavigationBar';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile/:accountemail" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/management" element={
          <div>
            <NavigationBar />
            <Management />
          </div>
          } />
        <Route path="/createevent" element={
          <div>
            <NavigationBar />
            <CreateEvent />
          </div>
        } />
        <Route path="/createpost" element={
          <div>
            <NavigationBar />
            <CreatePost />
          </div>
        } />
        <Route path="/search/" element={<Search />} />
        <Route path="/dashboard" element={
          <div>
            <NavigationBar />
            <Dashboard />
          </div>
        } />
      </Routes>
    </Router>
  </StrictMode>
);
