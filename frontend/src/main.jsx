import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Importing pages and components
import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Management from './pages/Management';
import CreateEvent from './pages/CreateEvent';
import CreatePost from './pages/CreatePost';
import Search from './pages/Search';
import Dashboard from './pages/Dashboard';
import ReportsPage from './pages/ReportsPage';

import NavigationBar from './components/NavigationBar/NavigationBar';
import Authentication from './auth/Authentication';
import Admin from './auth/Admin';

const router = createBrowserRouter([
  {
    element: <Authentication />, // Wrapper for protected routes
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/profile/:accountemail',
        element: (
          <>
            <Profile />
          </>
        ),
      },
      {
        path: '/management',
        element: (
          <>
            <NavigationBar />
            <Management />
          </>
        ),
      },
      {
        path: '/createevent',
        element: (
          <>
            <NavigationBar />
            <CreateEvent />
          </>
        ),
      },
      {
        path: '/createpost',
        element: (
          <>
            <NavigationBar />
            <CreatePost />
          </>
        ),
      },
      {
        path: '/search',
        element: (
          <>
            <NavigationBar />
            <Search />
          </>
        ),
      },
      {
        path: '/dashboard',
        element: (
          <>
            <NavigationBar />
            <Dashboard />
          </>
        ),
      },
      {
        element: <Admin />, // Wrapper for admin routes
        children: [
          {path: '/reports', element: <ReportsPage />}
        ]
      }
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
