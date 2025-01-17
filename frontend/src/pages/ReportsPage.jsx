import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../stylesheets/ReportsPage.css';
// import Header from '../components/Header/Header';
import ReviewReportPage from '../components/ReviewReportPage';
import NavigationBar from '../components/NavigationBar/NavigationBar';

const ReportsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null); // Set default to null
  const [reports, setReports] = useState([]);

  // Fetch reports from the backend
  useEffect(() => {
    axios
      .get('http://localhost:3001/report/get/all')
      .then((response) => {
        setReports(response.data);
      })
      .catch((err) => {
        console.error('Error fetching reports:', err);
      });
  }, []);

  // Function to handle the review button click and open the modal
  const handleReview = (report) => {
    setSelectedReport(report);  // Set the selected report
    setIsModalOpen(true);  // Open the modal
  };

  return (
    <div className="reports-page-main">
      <NavigationBar />
      <div className="reports-page-container">
        <div className="review-section">
          <h1 className="cases-title">{reports.length} cases to review</h1>
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
              {reports.length > 0 ? (
                reports.map((report, index) => (
                  <tr key={index}>
                    <td>{report.reporter}</td>
                    <td>{report.reportedOrg}</td>
                    <td>{report.reason}</td>
                    <td>
                      <button
                        className="review-button"
                        onClick={() => handleReview(report)}  // Pass the selected report to the modal
                      >
                        Review
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No reports available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {isModalOpen && selectedReport && (  // Ensure report is selected before rendering
          <ReviewReportPage
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            report={selectedReport}  // Pass the selected report to the modal
          />
        )}
      </div>
    </div>
  );
};

export default ReportsPage;