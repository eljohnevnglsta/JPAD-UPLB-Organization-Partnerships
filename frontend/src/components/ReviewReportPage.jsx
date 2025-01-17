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
    <div className='tailwind-scope'>
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${isOpen ? 'block' : 'hidden'}`}>
      <div className="fixed inset-0 bg-black opacity-50" onClick={handleClose}></div>
      <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
        <div className="bg-gray-100 px-4 py-3 sm:px-6 flex justify-between items-center">
          <h2 className="text-lg leading-6 font-medium text-gray-900">Review Report</h2>
          <button className="text-gray-400 hover:text-gray-500" onClick={handleClose}>
            <span className="sr-only">Close</span>
            ✖
          </button>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <div className="mb-4">
            <strong className="block text-sm font-medium text-gray-700">Sender:</strong>
            <span className="mt-1 text-sm text-gray-900">{report.reporter}</span>
          </div>
          <div className="mb-4">
            <strong className="block text-sm font-medium text-gray-700">Account Reported:</strong>
            <span className="mt-1 text-sm text-gray-900">{report.reportedOrg}</span>
          </div>
          <div className="mb-4">
            <strong className="block text-sm font-medium text-gray-700">Reason:</strong>
            <span className="mt-1 text-sm text-gray-900">{report.reason}</span>
          </div>
          <div className="mb-4">
            <strong className="block text-sm font-medium text-gray-700">Details:</strong>
            <p className="mt-1 text-sm text-gray-900">{report.description}</p>
          </div>
          <div className="mb-4">
            <strong className="block text-sm font-medium text-gray-700">Evidence:</strong>
            <img
              src={report.image}
              alt="Evidence"
              className="mt-1 w-full h-auto rounded"
            />
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 sm:ml-3 sm:w-auto sm:text-sm" onClick={handleBan}>
            Ban Account
          </button>
          <button className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-600 text-base font-medium text-white hover:bg-red-700 sm:ml-3 sm:w-auto sm:text-sm" onClick={handleClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ReviewReportPage;