import React, { useState } from 'react';
import ResponseModal from './ResponseModal';
import axios from 'axios';
import { useEffect } from 'react';

export default function RequestContent({ partnership }) {
    const userAccount = JSON.parse(localStorage.getItem('account'));
    const userEmail = userAccount.email;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');
    const [event, setEvent] = useState({});

    const {
        requestId,
        publisher,
        invitee,
        eventId,
        status,
        partnershipType,
        attachments,
        message,
        response,
    } = partnership;

    useEffect(() => {
        axios.post('http://localhost:3001/event/get/id', {
            eventId: eventId
        }).then((res) => {
            setEvent(res.data);
            console.log(res.data);
        }).catch((error) => {
            alert('An error occurred. Please try again later.');
        });
    }, []);

    if (!partnership) {
        return <p>No partnership selected.</p>;
    }

    // Handle form submission
    const handleRespond = (status) => {    
        axios.post('http://localhost:3001/request/update', {
            requestId: requestId,
            status: status,
            response: responseMessage,
        }).then((res) => {
            alert('Response submitted successfully!');
        }).catch((error) => {
            alert('An error occurred. Please try again later.');
        });
        
        
        axios.post('http://localhost:3001/event/update', {
            parterIds: [...event.partnerIds, invitee]
        }).then((res) => {
            if (res.data.success) {
                alert('Response submitted successfully!');
            } else {
                alert('An error occurred. Please try again later.');
            }
        }).catch((error) => {
            alert('An error occurred. Please try again later.');
        }).
    
        // Close the modal after submission
        setIsModalOpen(false);
    
        // Reset response message
        setResponseMessage('');

        // Refresh the page
        window.location.reload();
    };
    

    return (
        <div className="p-10 w-full max-w-3xl bg-white shadow-lg rounded-lg">
            {/* Header Section */}
            <div className="mb-6 border-b pb-4">
                <h1 className="text-3xl font-bold">Partnership Request</h1>
                <p className="text-gray-600">Request ID: <span className="font-mono">{requestId}</span></p>
            </div>

            {/* Partnership Details Section */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold">Partnership Details</h2>
                <p><strong>Status:</strong> <span className={`text-${getStatusColor(status)}`}>{status}</span></p>
                <p><strong>Type:</strong> {partnershipType}</p>
                <p><strong>Event:</strong> {event.title}</p>
            </div>

            {/* Participants */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold">Participants</h2>
                <p><strong>Publisher:</strong> {publisher}</p>
                <p><strong>Invitee:</strong> {invitee}</p>
            </div>

            {/* Message Section */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold">Message</h2>
                <p className="bg-gray-100 p-4 rounded-md">{message}</p>
            </div>

            {/* Response Section */}
            {response && (
                <div className="mb-6">
                    <h2 className="text-xl font-semibold">Response</h2>
                    <p className="bg-green-100 p-4 rounded-md">{response}</p>
                </div>
            )}

            {/* Attachments Section */}
            {attachments.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-xl font-semibold">Attachments</h2>
                    <ul className="list-disc list-inside">
                        {attachments.map((attachment, index) => (
                            <li key={index}>
                                <a href={attachment} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                                    Download Attachment {index + 1}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Respond and Cancel Buttons */}
            {partnership.publisher === userEmail ? (
                <button
                    onClick={() => handleRespond('cancelled')}
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                >
                    Cancel
                </button>
            ) : (
                status === 'pending' && (
                    <>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                        >
                            Respond
                        </button>
                        {isModalOpen && (
                            <ResponseModal
                                partnership={partnership}
                                setIsModalOpen={setIsModalOpen}
                                handleRespond={handleRespond}
                                responseMessage={responseMessage}
                                setResponseMessage={setResponseMessage}
                            />
                        )}
                    </>
                )
            )}
        </div>
    );
}

function getStatusColor(status) {
    switch (status) {
        case "approved":
            return "green-600";
        case "rejected":
            return "red-600";
        case "pending":
            return "yellow-600";
        case "completed":
            return "blue-600";
        case "cancelled":
            return "gray-600";
        default:
            return "black";
    }
}
