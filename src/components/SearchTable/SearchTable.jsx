import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SearchTable.css';
import Header from '../Header/Header';

const SearchTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from the backend
    axios
      .get('http://localhost:3001/getUsers')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((err) => {
        console.error('Error fetching users:', err);
      });
  }, []);

  // Filter data based on the search term
  const filteredUsers = users.filter(
    (user) =>
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="main-content">
      <Header />
      <div className="search-table-container">
        {/* Search bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for email, name, or role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Table */}
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Email</th>
                <th>Name</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user._id}>
                    <td>{user.email}</td>
                    <td>{user.name}</td>
                    <td>{user.role}</td>
                    <td className="button-container">
                      <button className="ban-button">Ban</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No users found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SearchTable;
