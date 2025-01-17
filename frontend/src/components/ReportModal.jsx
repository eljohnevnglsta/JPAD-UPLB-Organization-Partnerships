import React, { useState } from 'react';
import axios from 'axios';

export default function ReportModal({ isOpen, setIsOpen, partnership }) {
    const userAccount = JSON.parse(localStorage.getItem('account'));
    const [reason, setReason] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async () => {
        if (!reason || !description) {
            alert('Please fill in all required fields.');
            return;
        }

        const formData = new FormData();
        formData.append('reportId', `${Date.now()}-${Math.random()}`);
        formData.append('reportedOrg', partnership.publisher);
        formData.append('reporter', partnership.invitee);
        formData.append('reason', reason);
        formData.append('description', description);
        formData.append('image', image);

        try {
            const response = await axios.post('http://localhost:3001/report/create', {
                reportedOrg: userAccount.email === partnership.publisher ? partnership.invitee : partnership.publisher,
                reporter: userAccount.email === partnership.publisher ? partnership.publisher : partnership.invitee,
                reason,
                description,
                image: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
            });
            if (response.data.success) {
                alert('Report submitted successfully.');
                setIsOpen(false);
            } else {
                alert('An error occurred. Please try again.');
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred. Please try again.');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-md rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4">Report Organization</h2>
                <form>
                    {/* Reason Dropdown */}
                    <div className="mb-4">
                        <label htmlFor="reason" className="block text-gray-700 font-semibold">
                            Reason
                        </label>
                        <select
                            id="reason"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            className="w-full border border-gray-300 rounded-md p-2"
                        >
                            <option value="">Select a reason</option>
                            <option value="Non-compliance">Non-compliance</option>
                            <option value="Misconduct">Misconduct</option>
                            <option value="Unprofessional">Unprofessional</option>
                            <option value="Others">Others</option>
                        </select>
                    </div>

                    {/* Description */}
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-gray-700 font-semibold">
                            Description
                        </label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows="4"
                            className="w-full border border-gray-300 rounded-md p-2"
                            placeholder="Provide a detailed description..."
                        ></textarea>
                    </div>

                    {/* Image Upload */}
                    <div className="mb-4">
                        <label htmlFor="image" className="block text-gray-700 font-semibold">
                            Upload Evidence (optional)
                        </label>
                        <input
                            type="file"
                            id="image"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="w-full border border-gray-300 rounded-md p-2"
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
