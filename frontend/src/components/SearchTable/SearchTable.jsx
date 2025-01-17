import React, { useState } from 'react';
import './SearchTable.css';
import Header from '../Header/Header';

const SearchTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const data = [
    { email: 'exec@yses.org', name: 'Young Software Engineers Society', accountType: 'Organization' },
    { email: 'exec@yses.org', name: 'Young Software Engineers Society', accountType: 'Organization' },
    { email: 'eyevangelista@up.edu', name: 'Eljohn Evangelista', accountType: 'Individual' },
  ];

  const filteredData = data.filter(
    (item) =>
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.accountType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="main-content">
      <Header />
    <div className="search-table-container">
      {/* Search bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for email, name, or account type..."
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
              <th>Account Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index}>
                <td>{item.email}</td>
                <td>{item.name}</td>
                <td>{item.accountType}</td>
                <td className="button-container">
                  <button className="ban-button">Ban</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default SearchTable;
