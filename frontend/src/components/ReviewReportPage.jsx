import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../stylesheets/ReviewReportPage.css';
import axios from 'axios';

const ReviewReportPage = ({ isOpen, onClose, report }) => {
  const navigate = useNavigate();

  // Close modal and navigate back to reports page
  const handleClose = () => {
    onClose();
    navigate('/reports');
  };

  const handleBan = () => {
    axios.post('http://localhost:3001/account/update', { 
    email: report.reportedOrg,
    status: 'banned'
    }).then((response) => {
      handleClose();
    }).catch((err) => {
      console.error('Error banning account:', err);
    });
  }

  return (
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>Review Report</h2>
          <button className="close-button" onClick={handleClose}>
            ✖
          </button>
        </div>
        <div className="modal-body">
          <div className="detail-item">
            <strong>Sender:</strong> <span>{report.reporter}</span>
          </div>
          <div className="detail-item">
            <strong>Account Reported:</strong> <span>{report.reportedOrg}</span>
          </div>
          <div className="detail-item">
            <strong>Reason:</strong> <span>{report.reason}</span>
          </div>
          <div className="detail-item">
            <strong>Details:</strong>
            <p>{report.description}</p>
          </div>
          <div className="detail-item">
            <strong>Evidence:</strong>
            <img
              src={report.image}
              alt="Evidence"
              className="report-image"
            />
          </div>
        </div>
        <div className="modal-footer">
          <button className="ban-button" onClick={handleBan}>Ban Account</button>
          <button className="cancel-button" onClick={handleClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewReportPage;