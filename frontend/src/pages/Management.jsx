import React, { useEffect, useState } from 'react';
import PartnershipSummary from '../components/PartnershipSummary';
import axios from 'axios';
import RequestContent from '../components/RequestContent';

const userEmail = "exec@yses.org";

export default function Management() {
    // State to store partnerships and the selected partnership
    const [partnerships, setPartnerships] = useState([]);
    const [incoming, setIncoming] = useState([]);
    const [outgoing, setOutgoing] = useState([]);
    const [approved, setApproved] = useState([]);
    const [rejected, setRejected] = useState([]);
    const [selectedPartnership, setSelectedPartnership] = useState(null); // New state

    useEffect(() => {
        axios.get('http://localhost:3001/request/get/all')
            .then((response) => {
                const fetchedIncoming = response.data.filter((partnership) => partnership.invitee === userEmail && partnership.status === "pending");
                const fetchedOutgoing = response.data.filter((partnership) => partnership.publisher === userEmail && partnership.status === "pending");
                const fetchedApproved = response.data.filter((partnership) => partnership.status === "approved" && (partnership.publisher === userEmail || partnership.invitee === userEmail));
                const fetchedRejected = response.data.filter((partnership) => partnership.status === "rejected" && (partnership.publisher === userEmail || partnership.invitee === userEmail));

                // Update state
                setIncoming(fetchedIncoming);
                setOutgoing(fetchedOutgoing);
                setApproved(fetchedApproved);
                setRejected(fetchedRejected);
                setPartnerships(fetchedIncoming); // Default to incoming
            })
            .catch((error) => {
                console.log(error.message);
            });
    }, []);

    return (
        <div className="flex w-screen h-screen">
            {/* Left Section */}
            <div className="w-1/3 border-r border-black flex flex-col">
                <div className="border-b border-black h-16 flex items-center justify-center">
                    <p className="text-3xl font-sans-apple-system font-extrabold">your partnerships</p>
                </div>

                {/* Navigation Tabs */}
                <div className="border-b border-black h-16 flex space-x-10 items-center justify-evenly p-10">
                    <div
                        className="flex flex-col items-center justify-center cursor-pointer"
                        onClick={() => setPartnerships(incoming)}
                    >
                        <img
                            className="w-10 h-10"
                            src="https://img.icons8.com/?size=100&id=eVNSdU8gTUON&format=png&color=000000"
                            alt="Request"
                        />
                        <p>requests</p>
                    </div>

                    <div
                        className="flex flex-col items-center justify-center cursor-pointer"
                        onClick={() => setPartnerships(outgoing)}
                    >
                        <img
                            className="w-10 h-10"
                            src="https://img.icons8.com/?size=100&id=7874&format=png&color=000000"
                            alt="Sent"
                        />
                        <p>sent</p>
                    </div>

                    <div
                        className="flex flex-col items-center justify-center cursor-pointer"
                        onClick={() => setPartnerships(approved)}
                    >
                        <img
                            className="w-10 h-10"
                            src="https://img.icons8.com/?size=100&id=12404&format=png&color=000000"
                            alt="Approved"
                        />
                        <p>approved</p>
                    </div>

                    <div
                        className="flex flex-col items-center justify-center cursor-pointer"
                        onClick={() => setPartnerships(rejected)}
                    >
                        <img
                            className="w-10 h-10"
                            src="https://img.icons8.com/?size=100&id=ZLZpTTLWyuCY&format=png&color=000000"
                            alt="Rejected"
                        />
                        <p>rejected</p>
                    </div>
                </div>

                {/* Partnership Summary List */}
                <div className="flex-grow flex-col flex items-center justify-start">
                    {partnerships.map((partnership) => (
                        <div
                            key={partnership.requestId}
                            onClick={() => setSelectedPartnership(partnership)} // Set selected partnership
                            className="cursor-pointer"
                        >
                            <PartnershipSummary partnership={partnership} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Section */}
            <div className="flex-grow border-l border-black flex items-center justify-center">
                {selectedPartnership ? (
                    <RequestContent partnership={selectedPartnership} /> // Pass selected partnership
                ) : (
                    <p>Select a partnership to view details</p>
                )}
            </div>
        </div>
    );
}
