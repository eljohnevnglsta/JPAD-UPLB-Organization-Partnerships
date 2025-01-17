import React, { useState, useEffect } from 'react';
import ResponseModal from './ResponseModal';
import ReportModal from './ReportModal';
import axios from 'axios';

export default function RequestContent({ partnership }) {
    const userAccount = JSON.parse(localStorage.getItem('account'));
    const userEmail = userAccount.email;

    const [isResponseModalOpen, setIsResponseModalOpen] = useState(false);
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
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
        axios
            .post('http://localhost:3001/event/get/id', { eventId })
            .then((res) => {
                setEvent(res.data);
                console.log(res.data);
            })
            .catch(() => {
                alert('An error occurred. Please try again later.');
            });
    }, [eventId]);

    if (!partnership) {
        return <p>No partnership selected.</p>;
    }

    const handleRespond = (status) => {
        axios
            .post('http://localhost:3001/request/update', {
                requestId,
                status,
                response: responseMessage,
            })
            .then(() => {
                alert('Response submitted successfully!');
                window.location.reload();
            })
            .catch(() => {
                alert('An error occurred. Please try again later.');
                window.location.reload();
            });

        axios
            .post('http://localhost:3001/event/update', {
                eventId,
                partnerIds: [...event.partnerIds, invitee],
            })
            .then((res) => {
                if (res.data.success) {
                    setIsResponseModalOpen(false);
                    setResponseMessage('');
                    window.location.reload();
                } else {
                    alert('An error occurred. Please try again later.');
                    window.location.reload();
                }
            })
            .catch(() => {
                alert('An error occurred. Please try again later.');
                window.location.reload();
            });
    };

    return (
        <div className="p-10 w-full max-w-3xl bg-white shadow-lg rounded-lg">
            {/* Header Section */}
            <div className="mb-6 border-b pb-4">
                <h1 className="text-3xl font-bold">Partnership Request</h1>
                <p className="text-gray-600">
                    Request ID: <span className="font-mono">{requestId}</span>
                </p>
            </div>

            {/* Partnership Details */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold">Partnership Details</h2>
                <p>
                    <strong>Status:</strong>{' '}
                    <span className={`text-${getStatusColor(status)}`}>{status}</span>
                </p>
                <p>
                    <strong>Type:</strong> {partnershipType}
                </p>
                <p>
                    <strong>Event:</strong> {event.title || 'Loading...'}
                </p>
            </div>

            {/* Participants */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold">Participants</h2>
                <p>
                    <strong>Publisher:</strong> {publisher}
                </p>
                <p>
                    <strong>Invitee:</strong> {invitee}
                </p>
            </div>

            {/* Message */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold">Message</h2>
                <p className="bg-gray-100 p-4 rounded-md">{message}</p>
            </div>

            {/* Response */}
            {response && (
                <div className="mb-6">
                    <h2 className="text-xl font-semibold">Response</h2>
                    <p className="bg-green-100 p-4 rounded-md">{response}</p>
                </div>
            )}

            {/* Attachments */}
            {attachments.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-xl font-semibold">Attachments</h2>
                    <ul className="list-disc list-inside">
                        {attachments.map((attachment, index) => (
                            <li key={index}>
                                <a
                                    href={attachment}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 underline"
                                >
                                    Download Attachment {index + 1}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Buttons */}
            {publisher === userEmail ? (
                status === 'approved' || (status !== 'rejected' && (
                    <button
                        onClick={() => handleRespond('cancelled')}
                        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                    >
                        Cancel
                    </button>
                ))
            ) : (
                status === 'pending' && (
                    <>
                        <button
                            onClick={() => setIsResponseModalOpen(true)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                        >
                            Respond
                        </button>
                        {isResponseModalOpen && (
                            <ResponseModal
                                partnership={partnership}
                                setIsModalOpen={setIsResponseModalOpen}
                                handleRespond={handleRespond}
                                responseMessage={responseMessage}
                                setResponseMessage={setResponseMessage}
                            />
                        )}
                    </>
                )
            )}
            {status === 'approved' && (
                <>
                    <button
                        onClick={() => setIsReportModalOpen(true)}
                        className="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700 ml-4"
                    >
                        Report
                    </button>
                    {isReportModalOpen && (
                        <ReportModal
                            isOpen={isReportModalOpen}
                            setIsOpen={setIsReportModalOpen}
                            partnership={partnership}
                        />
                    )}
                </>
            )}
        </div>
    );
}

function getStatusColor(status) {
    switch (status) {
        case 'approved':
            return 'green-600';
        case 'rejected':
            return 'red-600';
        case 'pending':
            return 'yellow-600';
        case 'completed':
            return 'blue-600';
        case 'cancelled':
            return 'gray-600';
        default:
            return 'black';
    }
}
