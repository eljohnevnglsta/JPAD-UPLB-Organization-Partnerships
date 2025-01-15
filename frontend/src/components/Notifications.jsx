import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Notifications() {
    const userDetails = JSON.parse(localStorage.getItem('account'));
    const userEmail = userDetails.email;
    const [fetchedIncoming, setFetchedIncoming] = useState([]);
    const [fetchedApproved, setFetchedApproved] = useState([]);
    const [fetchedRejected, setFetchedRejected] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/request/get/all')
            .then((response) => {
                setFetchedIncoming(response.data.filter((partnership) => partnership.invitee === userEmail && partnership.status === "pending"));
                setFetchedApproved(response.data.filter((partnership) => partnership.status === "approved" && (partnership.publisher === userEmail || partnership.invitee === userEmail)));
                setFetchedRejected(response.data.filter((partnership) => partnership.status === "rejected" && (partnership.publisher === userEmail || partnership.invitee === userEmail)));
            })
            .catch((error) => {
                console.log(error.message);
            });
    }, [userEmail]);

    return (
        <div className="notifications-box">
            <h2>Notifications</h2>
            
            <div className="notifications">

                {/* Notification Cards */}
                <div className="notification-card">
                    <div className="number-box-1">{fetchedIncoming.length}</div>
                    <div className="description">
                        <span className="highlight new">new</span> partnerships from other organizations
                    </div>
                </div>
                
                <div className="notification-card">
                    <div className="number-box-2">{fetchedRejected.length}</div>
                    <div className="description">
                        <span className="highlight rejected">rejected</span> partnerships
                    </div>
                </div>
                
                <div className="notification-card">
                    <div className="number-box-3">{fetchedApproved.length}</div>
                    <div className="description">
                        <span className="highlight accepted">accepted</span> partnerships
                    </div>
                </div>
            </div>
                
            {/* Partnerships Link */}
                
            <div className="partnerships">
                <div className="btn-partnerships"> View in Partnerships Tab</div>
            </div>
        </div>
    );
}

export default Notifications;