import React, { useState } from 'react';
import './ReportsPage.css';
import Header from '../components/Header/Header';
import ReviewReportPage from './ReviewReportPage';

const ReportsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  const reportsData = [
    {
      sender: 'exec@yses.org',
      reported: 'keme@org.com',
      reason: 'unprofessionalism',
      paragraph: 'The reported account exhibited unprofessional behavior during a project discussion.',
      image: 'https://via.placeholder.com/800x400', // Replace with actual evidence image URL
    },
    // Add more reports as needed
  ];

  const handleReview = (report) => {
    setSelectedReport(report);
    setIsModalOpen(true);
  };

  return (
    <div className="reports-page-main">
      <Header />
    <div className="reports-page-container">
      <div className="review-section">
        <h1 className="cases-title">4 cases to review</h1>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Sender</th>
              <th>Account Reported</th>
              <th>Reason</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reportsData.map((report, index) => (
              <tr key={index}>
                <td>{report.sender}</td>
                <td>{report.reported}</td>
                <td>{report.reason}</td>
                <td>
                  <button
                    className="review-button"
                    onClick={() => handleReview(report)}
                  >
                    Review
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <ReviewReportPage
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          report={selectedReport}
        />
      )}
    </div>
    </div>
  );
};

export default ReportsPage;
